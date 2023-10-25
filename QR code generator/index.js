/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
        message: "Please enter your url",
        name:"url"
    }
  ])
  .then((answers) => {
        const url = answers.url;
        var qrpng = qr.image(url);
        qrpng.pipe(fs.createWriteStream("img.png"));
        
        fs.writeFile('URL.txt', url, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        }); 
  })
  .catch((error) => {
        if (error.isTtyError) {
        console.log(error.isTtyError);
        } else {
        console.log("something else is wrong");
        }
  });