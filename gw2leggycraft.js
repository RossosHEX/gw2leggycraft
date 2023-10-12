$(document).ready(function(){
    function highlight_numbers() {
        $('.have_vs_need').each(function(i, obj) {
            //alert(""+obj.innerHTML);
            
            var items_have=parseInt(obj.children[0].innerHTML);
            var items_need=parseInt(obj.children[1].innerHTML); 
            
            //alert(""+items_have+" / "+items_need);
            //alert(i);
            
            if ( !(items_have < items_need) )
            {
                obj.setAttribute('style','background:lawngreen;');
                
                var this_section = obj.parent();
            }
        });
    }
    
    function hide_sections() {
        $('.item_wrapper').each(function(i, obj) {
            //alert(""+obj.innerHTML);
            
            var items_have=parseInt(obj.children[0].children[0].innerHTML);
            var items_need=parseInt(obj.children[0].children[1].innerHTML); 
            
            //alert(""+items_have+" / "+items_need);
            //alert(i);
            
            if ( !(items_have < items_need) )
            {
                obj.children[0].setAttribute('style','background:lawngreen;');
                obj.children[2].setAttribute('hidden','hidden');
            }
        });
    }
    
    // Get value on button click and show alert
    $("#myBtn").click(function(){
        var secureAPIkey = $("#secureAPIkey").val();
        //alert(secureAPIkey);
        
        var poll_materialstorage = $("#poll_materialstorage").prop("checked");
        //alert(poll_materialstorage);
        if (poll_materialstorage == true) {
            //alert('poll_materialstorage YES');
            $.ajax({
                url: "https://api.guildwars2.com/v2/account/materials", 
                data: "access_token="+secureAPIkey, 
                dataType: "json",
                
                success: function(data)
                {
                    //alert('we got account/materials data');
                    
                    for( var element in data)
                    {
                        var item_id = data[element]['id'];
                        var item_have_count = data[element]['count'];
                        $('label[id*="'+item_id+'_have"]').html( item_have_count );
                        
                        //alert("We got "+item_id+" with count "+item_have_count);
                        //break;
                    }
                    
                    //highlight_numbers();
                    hide_sections();
                }
            });
        } else {
            //alert('poll_materialstorage NO');
        }
        
        var poll_wallet = $("#poll_wallet").prop("checked");
        //alert(poll_wallet);
        if (poll_wallet == true) {
            //alert('poll_wallet YES');
            $.ajax({
                url: "https://api.guildwars2.com/v2/account/wallet", 
                data: "access_token="+secureAPIkey, 
                dataType: "json",
                
                success: function(data)
                {
                    //alert('we got account/wallet data');
                    
                    for( var element in data)
                    {
                        var item_id = data[element]['id'];
                        var item_have_count = data[element]['value'];
                        $('label[id*="i'+item_id+'_have"]').html( item_have_count );
                        
                        //alert("We got "+item_id+" with count "+item_have_count);
                        //break;
                        //$('#debug_textarea').append(""+item_id+"\n"); 
                    }
                    
                    //highlight_numbers();
                    hide_sections();
                }
            });
        } else {
            //alert('poll_wallet NO');
        }
        
        var poll_bank = $("#poll_bank").prop("checked");
        //alert(poll_bank);
        if (poll_bank == true) {
            //alert('poll_bank YES');
            $.ajax({
                url: "https://api.guildwars2.com/v2/account/bank", 
                data: "access_token="+secureAPIkey, 
                dataType: "json",
                
                success: function(data)
                {
                    //alert('we got account/bank data');
                    
                    for( var element in data)
                    {
                        if (!(data[element] == null))
                        {
                            var item_id = data[element]['id'];
                            var item_have_count = data[element]['count'];
                            $('label[id*="i'+item_id+'_have"]').html( item_have_count );
                            
                            //alert("We got "+item_id+" with count "+item_have_count);
                            //break;
                            //$('#debug_textarea').append(""+item_id+"\n");
                        }
                    }
                    
                    //highlight_numbers();
                    hide_sections();
                }
            });
        } else {
            //alert('poll_bank NO');
        }
        
        
        
    });
});

$()
