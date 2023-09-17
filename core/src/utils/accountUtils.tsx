export const parseAccounts = (allAccounts)=>{
    let parsedAccounts = [{}];
    parsedAccounts.pop();
    for(let i=0;i<allAccounts.length;i++){
        parsedAccounts.push({
            name:allAccounts[i].meta.name,
            address:allAccounts[i].address
        })
    }
    return parsedAccounts;
}