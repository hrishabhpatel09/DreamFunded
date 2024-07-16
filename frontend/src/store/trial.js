const array = [1,2,3,4,5];
const newArray = array.map((val,idx,arr)=>{
    if(val==5){
        return val*2;
    }else{
        return val;
    }
})
console.log(newArray)