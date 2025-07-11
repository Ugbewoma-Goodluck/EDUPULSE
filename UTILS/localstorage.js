export const setitem = () =>{
    try{
        window.localStorage.setItem(JSON.stringify(value));
    } catch{
        console.log(error);
    }
}
export const getitem = () =>{
    try{
        const item = window.localStorage.getItem()
        return item ? JSON.parse(item) : undefined;
    }catch (error){
        console.log(error);
    }
}
