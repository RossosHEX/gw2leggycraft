$(document).ready(function(){
    const giantarray = [];
    
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
    
    
    function poll_character(secureAPIkey,character_name) {
        //$('#debug_textarea').append(character_name+" inventory: ");
        $.ajax({
            url: "https://api.guildwars2.com/v2/characters/"+character_name+"/inventory", 
            data: "access_token="+secureAPIkey, 
            dataType: "json",
            
            success: function(data)
            {
                //alert('we got account/bank data');
                $('#debug_textarea').append(character_name+"/inventory: Success.\n");
                
                for( var element in data) // bags[]
                {
                    var bag_array = data[element];
                    
                    for( var bag in bag_array)
                    {
                        //$('#debug_textarea').append(character_name+': '+bag_array[bag]['id']   +"\n");
                        var inventory_array = bag_array[bag]['inventory'];
                        
                        for( var slot in inventory_array)
                        {
                            if (!(inventory_array[slot] == null))
                            {
                                var item_id = inventory_array[slot]['id'];
                                var item_have_count = inventory_array[slot]['count'];
                                $('label[id*="i'+item_id+'_have"]').html( item_have_count );
                                
                                if (giantarray[item_id]) {
                                    giantarray[item_id] += [item_have_count];
                                }
                                else {
                                    giantarray[item_id] = [item_have_count];
                                }
                                $('label[id*="i'+item_id+'_have"]').html( giantarray[item_id] );
                            }
                        }
                    }
                }
                
                //highlight_numbers();
                hide_sections();
            },
                
                error: function(xhr, ajaxOptions, thrownError)
                {
                    //alert(xhr.status);
                    //alert(thrownError);
                    $('#debug_textarea').append(character_name+"/inventory: Error.\n");
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
            //$('#debug_textarea').append("Material Storage: ");
            $.ajax({
                url: "https://api.guildwars2.com/v2/account/materials", 
                data: "access_token="+secureAPIkey, 
                dataType: "json",
                
                success: function(data)
                {
                    //alert('we got account/materials data');
                    $('#debug_textarea').append("Material Storage: Success.\n");
                    
                    for( var element in data)
                    {
                        var item_id = data[element]['id'];
                        var item_have_count = data[element]['count'];
                        $('label[id*="'+item_id+'_have"]').html( item_have_count );
                        
                        //alert("We got "+item_id+" with count "+item_have_count);
                        //break;
                        
                        if (giantarray[item_id]) {
                            giantarray[item_id] += [item_have_count];
                        }
                        else {
                            giantarray[item_id] = [item_have_count];
                        }
                        $('label[id*="i'+item_id+'_have"]').html( giantarray[item_id] );
                    }
                    
                    //highlight_numbers();
                    hide_sections();
                },
                
                error: function(xhr, ajaxOptions, thrownError)
                {
                    //alert(xhr.status);
                    //alert(thrownError);
                    $('#debug_textarea').append("Material Storage: Error.\n");
                }
            });
        } else {
            //alert('poll_materialstorage NO');
        }
        
        var poll_wallet = $("#poll_wallet").prop("checked");
        //alert(poll_wallet);
        if (poll_wallet == true) {
            //alert('poll_wallet YES');
            //$('#debug_textarea').append("Wallet: ");
            $.ajax({
                url: "https://api.guildwars2.com/v2/account/wallet", 
                data: "access_token="+secureAPIkey, 
                dataType: "json",
                
                success: function(data)
                {
                    //alert('we got account/wallet data');
                    $('#debug_textarea').append("Wallet: Success.\n");
                    
                    for( var element in data)
                    {
                        var item_id = data[element]['id'];
                        var item_have_count = data[element]['value'];
                        $('label[id*="i'+item_id+'_have"]').html( item_have_count );
                        
                        //alert("We got "+item_id+" with count "+item_have_count);
                        //break;
                        //$('#debug_textarea').append(""+item_id+"\n");
                        
                        if (giantarray[item_id]) {
                            giantarray[item_id] += [item_have_count];
                        }
                        else {
                            giantarray[item_id] = [item_have_count];
                        }
                        $('label[id*="i'+item_id+'_have"]').html( giantarray[item_id] );
                    }
                    
                    //highlight_numbers();
                    hide_sections();
                },
                
                error: function(xhr, ajaxOptions, thrownError)
                {
                    //alert(xhr.status);
                    //alert(thrownError);
                    $('#debug_textarea').append("Wallet: Error.\n");
                }
            });
        } else {
            //alert('poll_wallet NO');
        }
        
        var poll_bank = $("#poll_bank").prop("checked");
        //alert(poll_bank);
        //$('#debug_textarea').append("Bank: ");
        if (poll_bank == true) {
            //alert('poll_bank YES');
            $.ajax({
                url: "https://api.guildwars2.com/v2/account/bank", 
                data: "access_token="+secureAPIkey, 
                dataType: "json",
                
                success: function(data)
                {
                    //alert('we got account/bank data');
                    $('#debug_textarea').append("Bank: Success.\n");
                    
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
                            
                            if (giantarray[item_id]) {
                                giantarray[item_id] += [item_have_count];
                            }
                            else {
                                giantarray[item_id] = [item_have_count];
                            }
                            $('label[id*="i'+item_id+'_have"]').html( giantarray[item_id] );
                        }
                    }
                    
                    //highlight_numbers();
                    hide_sections();
                },
                
                error: function(xhr, ajaxOptions, thrownError)
                {
                    //alert(xhr.status);
                    //alert(thrownError);
                    $('#debug_textarea').append("Bank: Error.\n");
                }
            });
        } else {
            //alert('poll_bank NO');
        }
        
        var poll_characterinventories = $("#poll_characterinventories").prop("checked");
        //alert(poll_characterinventories);
        if (poll_characterinventories == true) {
            //alert('poll_bank YES');
            //$('#debug_textarea').append("Character List: \n");
            $.ajax({
                url: "https://api.guildwars2.com/v2/characters", 
                data: "access_token="+secureAPIkey, 
                dataType: "json",
                
                success: function(data)
                {
                    //alert('we got account/bank data');
                    $('#debug_textarea').append("Characters found:\n");
                    
                    for( var element in data)
                    {
                        $('#debug_textarea').append(""+data[element]+"\n");
                    }
                    
                    for( var element in data)
                    {
                        poll_character(secureAPIkey,data[element]);
                    }
                    
                    //highlight_numbers();
                    hide_sections();
                },
                
                error: function(xhr, ajaxOptions, thrownError)
                {
                    //alert(xhr.status);
                    //alert(thrownError);
                    $('#debug_textarea').append("Characters Poll: Error.\n");
                }
            });
        } else {
            //alert('poll_characterinventories NO');
        }
        
    });
});

$()
