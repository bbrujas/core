async function groupTransactions(data) {

    String.prototype.replaceAt = function (from, length, replacement_string) {
        return this.substring(0, from) + replacement_string + this.substring(from + length + replacement_string.length);
    }

    var txList = {};
    var sortedTxArray = [];


    if ((data.result) && (data.result.length > 0)) {

        var length = data.result.length;

        for (var i = 0; i < length; i++) {
            let address = (data.result[i].from).replaceAt(5, 33, "**")
            if (!txList.hasOwnProperty(address)) {
                txList[address] = 1;
            } else {
                txList[address] = txList[address] + 1;
            }
        }

        for (var address in txList) {
            sortedTxArray.push([address, txList[address]])
        }

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