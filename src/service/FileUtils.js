export const getBase64 = (image, converted, setConverted) => {
  return new Promise(resolve => {
    // let imageInfo;
    let baseURL = "";
    // Make new imageReader
    let reader = new FileReader();
    // console.log(image)

    // Convert the image to base64 text
    reader.readAsDataURL(image);

    // on reader load somthing...
    reader.onload = () => {
      baseURL = reader.result;
      // setConverted([...converted, baseURL])
      // console.log(baseURL);
      resolve(baseURL);
      return baseURL
    };
  });
};

