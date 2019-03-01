class page_engine {
    constructor() {
        //page identifier is used to discover which new pages to convert to PDF
        this.settings = {"current_page":null}
        this.settings.default_appendTo = ".container-fluid[container]"
        this.addBit("home","/bits/home.html")
        
    }
    
    //Use this function to add a bit to the page
    //appendTo is used itentify the location it will append the bit to
    //bitAddress is used to find the location of the bit
    async addBit(bitName, bitAddress,appendTo) {
        var bitString;
        bitName = `bit_${bitName}`
        if (appendTo == null) appendTo = this.settings.default_appendTo
        await jQuery.get(bitAddress, function (data) {
            bitString = `<div class="bit" id="${bitName}" >\n${data.toString()}\n</div>`
            $(appendTo).append(bitString);
            $("#"+bitName).hide()
            $("#"+bitName).slideDown('slow')
        });
        this.settings.current_page = bitName
    }
    
    //Use this function to remove existing bit and add a new one
    //use bitName to identify the new bit to be added
    //bitAddress is used to specify a specific address of a bit, defaults to undefined
    async swapBits(bitName,bitAddress,appendTo){
        if (`bit_${bitName}` === this.settings.current_page) return 1
        if (appendTo == null) appendTo = this.settings.default_appendTo
        var callback = $("#"+this.settings.current_page).slideUp("slow",() => {
            callback.remove()
            bit_data = null
            this.addBit(bitName,bitAddress,appendTo)
        })
        $('.sidenav').sidenav('close');
    }
}