exports.genpass = (type = "alphanumspec",size = 8)=>{
let alpha = "abcdefghijklmnopqrstuvwxyz"
alpha = alpha.split("");
let num = "1234567890";
num = num.split("");
let alphanum = [...alpha,...num];
let alphanumspec = [...alphanum,"!","@,","#","$","%","^","&","*","(",")","_","+","=","-","}","{","]","[",":",";","?"];
const createPass = (arr,size)=>{
    var password = ""
for(let i = 0; i<size;i++)
{
    password = password + arr[Math.floor(Math.random() * arr.length)]
}
return password;
}
if(type === "alpha")
{
    return createPass(alpha,size)
}
if(type === "num")
{
    return createPass(num,size)
}
if(type === "alphanum")
{
    return createPass(alphanum,size)
}
return createPass(alphanumspec,size)
}