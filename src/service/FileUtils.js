export const getBase64 = (file, converted, setConverted) => {
  return new Promise(resolve => {
    let fileInfo;
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();
    console.log(file)

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      // console.log("Called", reader);
      baseURL = reader.result;
      // console.log(baseURL);

      setConverted([...converted, baseURL])
      resolve(baseURL);
    };
    console.log(fileInfo);
  });
};