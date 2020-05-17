/**
 * Check existence of a GitHub account
 * @param user - GitHub username
 * @returns {Promise<boolean|any>} - Repository urls
 */
export const fetchGithub = async user => {
  try {
    const repository = await fetch(
      `https://api.github.com/users/${user}/repos`,
      {
        credentials: 'include',
        headers: new Headers({
          Accept: 'application/vnd.github.v3+json',
        }),
      },
    );
    const jsonRepo = await repository.json();
    return jsonRepo;
  } catch (e) {
    return false;
  }
};

/**
 * Send the repository url to a Telegram account
 * @param url - Repository url
 * @param T_url - Telegram account bot url: use this service https://pushmore.io
 * @returns {Promise<boolean>}
 */
const T_tur = 'https://pushmore.marc.io/webhook/vdtwTzwgmZyQs7hTYU6Fjx1K';
export const sendGithub = async url => {
  try {
    const bodyReq = {
      repoUrl: url,
      sender: 'Emanuele Guidotti',
    };
    const sendResponse = await fetch(
      T_tur,
      {
        method: 'POST',
        body: JSON.stringify(bodyReq),
      },
    );
    return sendResponse.status === 200 && sendResponse.ok;
  } catch (e) {
    return false;
  }
};
