import slack from "./slack-client.js";
import { getSelectableUsers } from "../utils/users.js";
import { postMessage, updateMessage } from "../utils/message.js";
import { buildApprovalModal, buildRequestBlocks } from "../utils/blocks.js";

export const handleCommand = async (req, res) => {
  const { text, trigger_id, user_id } = req.body;
  const users = await getSelectableUsers();
  const modal = buildApprovalModal(users, text);
  modal.private_metadata = user_id;

  await slack.views.open({ trigger_id, view: modal });
  res.status(200).send();
};

export const handleInteraction = async (req, res) => {
  const payload = JSON.parse(req.body.payload.toString());

  if (
    payload.type === "view_submission" &&
    payload.view.callback_id === "approval_modal"
  ) {
    const approver =
      payload.view.state.values.user_block.selected_user.selected_option.value;
    const description =
      payload.view.state.values.desc_block.description_input.value;
    const sender = payload.user.id;

    await postMessage({
      channel: approver,
      text: "New approval request",
      blocks: buildRequestBlocks(sender, approver, description),
    });

    await postMessage({
      channel: sender,
      text: `Your approval request for\n*Description:* ${description}\nhas been sent to <@${approver}>.`,
    });
  }

  if (payload.type === "block_actions") {
    const { sender, approver, action } = JSON.parse(payload.actions[0].value);
    const actor = payload.user.id;

    if (actor !== approver) {
      return res.send({
        text: "Only the selected approver can take action.",
      });
    }

    const senderText = `${action === "Approved" ? "✅" : "❌"} Your Approval Request has been *${action}* by <@${actor}>.`;
    const approverText = `Here's a summary of this Approval:\n*Requested By:* <@${sender}>\n\n*Status:* ${action.toUpperCase()}`;

    // Notify the sender
    await postMessage({
      channel: sender,
      text: senderText,
    });

    // Update original message to reflect action and remove buttons
    await updateMessage({
      channel: payload.channel.id,
      ts: payload.message.ts,
      text: approverText,
      blocks: [],
    });

    return res.status(200).send();
  }

  res.status(200).send();
};
