export const getBase64 = (image) => {
  return new Promise(resolve => {
    let baseURL = "";
    let reader = new FileReader();
    // Convert the image to base64 text
    reader.readAsDataURL(image);

    // on reader load somthing...
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
      return baseURL
    };
  });
};