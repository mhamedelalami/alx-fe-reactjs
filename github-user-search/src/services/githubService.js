import axios from 'axios';

export const fetchUserData = async ({ username, location, minRepos }) => {
  let query = '';

  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`);

  const users = response.data.items;

  // Fetch extra details per user (for repo count, location)
  const detailedUsers = await Promise.all(
    users.map((user) => axios.get(user.url).then((res) => res.data))
  );

  return detailedUsers;
};
