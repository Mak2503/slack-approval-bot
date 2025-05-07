import slack from '../services/slack-client.js';

export const getSelectableUsers = async () => {
  const users = await slack.users.list();
  return users.members.filter(u =>
    !u.is_bot && u.id !== 'USLACKBOT'
  );
};
