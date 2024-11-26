export function random(len:number){
    let options = "krgfwrugjhaejhgdjevfjhesfg126263456246jshvfhcwe26r";
    let ans = "";
    let length = options.length;
    for(let i =0;i<len;i++){
        ans+= options[(Math.floor(Math.random()*length))];
        
    }
    return ans
}