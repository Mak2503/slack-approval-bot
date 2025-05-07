import slack from "../services/slack-client.js";

export const postMessage = async ({ channel, text, blocks }) => {
  try {
    await slack.chat.postMessage({
      channel,
      text,
      blocks
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateMessage = async ({ channel, ts, text, blocks }) => {
  try {
    await slack.chat.update({
      channel,
      ts,
      text,
      blocks
    });
  } catch (err) {
    console.error(err);
  }
}