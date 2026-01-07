const fetchImage = async (url: string) => {
    var myHeaders = new Headers();
    myHeaders.append('Referer', 'localhost');

    var requestOptions: any = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    }

    let data: any = '';

    await fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            data = result;
        })
        .catch((error) => console.error('error', error))

    return data;
}

export default fetchImage;