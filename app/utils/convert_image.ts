

export  function getBase64(file: File): Promise<string | null> {
      
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = function () {
        resolve(reader.result?.toString() ?? null);
      };
  
      reader.onerror = function (error) {
        console.error('Error: ', error);
        reject(null);
      };
  
      reader.readAsDataURL(file);
    });
}