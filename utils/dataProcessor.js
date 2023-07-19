function groupTransactions(data) {
    //  var jsonData = await str.json();
    //manipulate address to remove wallet addresses' digits
    //console.log(data);
    String.prototype.replaceAt = function (from, length, replacement_string) {
        return this.substring(0, from) + replacement_string + this.substring(from + length + replacement_string.length);
    }

    var txList = {};
    var sortedTxArray = [];

    if ((data.result) && (data.result.length > 0)) {

        for (var i = 0; i < data.result.length; i++) {
            var address = (data.result[i].from).replaceAt(5, 33, "**")
            if (!txList.hasOwnProperty(address)) {
                txList[address] = 1;
            } else {
                txList[address] = txList[address] + 1;
            }
        }

        //create a hashmap for txList with more than 3 TX.
        for (var address in txList) {
            if (parseInt(txList[address]) >= 3) sortedTxArray.push([address, txList[address]])
        }

        //sort the txList
        sortedTxArray.sort(function (a, b) {
            return b[1] - a[1];
        })

        return sortedTxArray

    } else {

        return 0

    }
}

module.exports = {
    groupTransactions
}