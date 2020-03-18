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

export const sendGithub = async url => {
  try {
    const bodyReq = {
      repoUrl: url,
      sender: 'Emanuele Guidotti',
    };
    const sendResponse = await fetch(
      'https://pushmore.marc.io/webhook/vdtwTzwgmZyQs7hTYU6Fjx1K',
      {
        method: 'POST',
        body: JSON.stringify(bodyReq),
      },
    );
    if (sendResponse.status == 200 && sendResponse.ok) return true;
    else return false;
  } catch (e) {
    return false;
  }
};
