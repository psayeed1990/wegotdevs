export const apiCall = async (reqType, url, reason, formInput, user) => {
  const URL = `http://localhost:5002/api/v1/${url}`;
  try {
    //axios[reqType](URL, formInput);
    // const { data } = await Axios({
    //   method: reqType,
    //   url: URL,
    //   withCredentials: true,

    //   data: formInput,
    // });

    if (reqType === 'GET') {
      const data = await fetch(URL, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const datas = await data.json();
      return datas;
    } else {
      const data = await fetch(URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formInput),
      });

      const datas = await data.json();

      return datas;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
