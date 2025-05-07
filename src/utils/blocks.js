export const buildApprovalModal = (users, text) => ({
  type: "modal",
  callback_id: "approval_modal",
  title: { type: "plain_text", text: "Approval Request" },
  submit: { type: "plain_text", text: "Get Approval" },
  close: { type: "plain_text", text: "Cancel" },
  blocks: [
    {
      type: "input",
      block_id: "user_block",
      label: { type: "plain_text", text: "Approver" },
      element: {
        type: "static_select",
        action_id: "selected_user",
        options: users.map(user => ({
          text: { type: 'plain_text', text: user.real_name || user.name },
          value: user.id
        })),
        placeholder: {
          text: "Select an approver",
          type: "plain_text",
        },
      },
    },
    {
      type: "input",
      block_id: "desc_block",
      label: { type: "plain_text", text: "Description" },
      element: {
        type: "plain_text_input",
        action_id: "description_input",
        multiline: true,
        initial_value: text,
      },
    },
  ],
});

export const buildRequestBlocks = (sender, approver, description) => [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*There is a new Approval Request*\n*Description:* ${description}\n*Requested By:* <@${sender}>\n*Seeking Approval From:* <@${approver}>\n`,
    }
  },
  {
    type: "actions",
    block_id: "approval_actions",
    elements: [
      {
        type: "button",
        text: { type: "plain_text", text: "Approve" },
        style: "primary",
        value: JSON.stringify({ sender, approver, action: "Approved" }),
        action_id: "approve_btn",
      },
      {
        type: "button",
        text: { type: "plain_text", text: "Deny" },
        style: "danger",
        value: JSON.stringify({ sender, approver, action: "Denied" }),
        action_id: "deny_btn",
      },
    ],
  },
];
