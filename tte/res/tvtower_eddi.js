
function btnsave(category){
	if(category=='ads'){
		var xmlText = new XMLSerializer().serializeToString(xml_db_ads);
		var filename="database_ads.xml";
	}
	if(category=='news'){
		var xmlText = new XMLSerializer().serializeToString(xml_db_news);
		var filename="database_news.xml";
	}
	if(category=='people'){
		var xmlText = new XMLSerializer().serializeToString(xml_db_people);
		var filename="database_people.xml";
	}
	if(category=='programme'){
		var xmlText = new XMLSerializer().serializeToString(xml_db_programme);
		var filename="database_programmes.xml";
	}
	xmlText=formatXml(xmlText);
	var blob = new Blob([xmlText], {
		type: "text/plain;charset=utf-8;",
	});
	saveAs(blob, filename);
}


function get_firstChild(n) {
    var y = n.firstChild;
	var out=y;
    while (y!=undefined && y.nodeType != 1) {
		out=y;
	    y = y.nextSibling;
    }
    return out;
}

var xml_db_ads=null;
var ad_paths=[
				'ad.id',
				'ad.creator',
				'ad.created_by',
				'ad#title#de',
				'ad#title#en',
				'ad#description#de',
				'ad#description#en',
				'ad#conditions.min_audience',
				'ad#conditions.min_image',
				'ad#conditions.target_group',
				'ad#conditions.pro_pressure_groups',
				'ad#conditions.contra_pressure_groups',
				'ad#data.repetitions',
				'ad#data.duration',
				'ad#data.quality',
				'ad#data.profit',
				'ad#data.penalty',
				'ad#data.infomercial',
				'ad#data.infomercial_profit',
				'ad#data.fix_infomercial_profit',
				'ad#data.year_range_from',
				'ad#data.year_range_to',
				];

var xml_db_news=null;
var news_paths=[
				'news.id',
				'news.thread_id',
				'news.type',
				'news.creator',
				'news.created_by',
				'news#title#de',
				'news#title#en',
				'news#description#de',
				'news#description#en',
				'news#effects#effect.trigger',
				'news#effects#effect.type',
				'news#effects#effect.news',
				'news#data.genre',
				'news#data.price',
				'news#data.quality',
				'news#conditions.year_range_from',
				'news#conditions.year_range_to'
				];

var xml_db_people=null;
var people_paths=[
				'person.id',
				'person.tmdb_id',
				'person.imdb_id',
				'person.creator',
				'person#first_name',
				'person#last_name',
				'person#nick_name',
				'person#details.job',
				'person#details.gender',
				'person#details.birthday',
				'person#details.deathday',
				'person#details.country',
				'person#data.prominence',
				'person#data.skill',
				'person#data.fame',
				'person#data.scandalizing',
				'person#data.price_mod',
				'person#data.power',
				'person#data.humor',
				'person#data.charisma',
				'person#data.appearance',
				'person#data.topgenre1',
				'person#data.topgenre2',
				];
				
var xml_db_programme=null;				
var programme_paths=[
				'programme.id',
				'programme.product',
				'programme.licence_type',
				'programme.tmdb_id',
				'programme.imdb_id',
				'programme.rt_id',
				'programme.creator',
				'programme#title#de',
				'programme#title#en',
				'programme#description#de',
				'programme#description#en',
				'programme#groups.target_groups',
				'programme#groups.pro_pressure_groups',
				'programme#groups.contra_pressure_groups',
				'programme#data.country',
				'programme#data.year',
				'programme#data.distribution',
				'programme#data.maingenre',
				'programme#data.subgenre',
				'programme#data.flags',
				'programme#data.blocks',
				'programme#data.time',
				'programme#data.price_mod',
				'programme#ratings.critics',
				'programme#ratings.speed',
				'programme#ratings.outcome',
]

function getElementByIdAndPath(xmlid, path, xml_root){
	var path_parts	= path.split('.');
	var nodelist 	= path_parts[0].split('#');
	var isattr 		= path_parts.length==2 ? true:false;
	
	if(nodelist[0]=="ad"){
		var root_elems=xml_root.getElementsByTagName("ad");
		}
	if(nodelist[0]=="news"){
		var root_elems=xml_root.getElementsByTagName("news");
		}
	if(nodelist[0]=="person"){
		var root_elems=xml_root.getElementsByTagName("person");
		}
	if(nodelist[0]=="programme"){
		var root_elems=xml_root.getElementsByTagName("programme");
		}
		
	if(root_elems==undefined || root_elems.length<=xmlid){
		console.log("Tried to access element "+path+" with xmlid "+xmlid+" but list is too short!")
		return
		}
	
	var pointer=root_elems[xmlid];
	for (var i=1;i<nodelist.length;i++){
		var tp = pointer.getElementsByTagName(nodelist[i]);
		if (tp == undefined || tp.length<1) {return ("");}
		pointer=tp[0];
	}
	
	if (isattr){
		return pointer.getAttribute(path_parts[1]);
	}else{
		var el=get_firstChild(pointer);
		if(el!=undefined){
			return el.nodeValue;	
		}
	}
	return"";
	}

function setElementByIdAndPath(inputval, xmlid, path, xml_root){
	var path_parts	= path.split('.');
	var nodelist 	= path_parts[0].split('#');
	var isattr 		= path_parts.length==2 ? true:false;
	
	if(nodelist[0]=="ad"){
		var root_elems=xml_root.getElementsByTagName("ad");
		}
	if(nodelist[0]=="news"){
		var root_elems=xml_root.getElementsByTagName("news");		
		}
	if(nodelist[0]=="person"){
		var root_elems=xml_root.getElementsByTagName("person");
		}
	if(nodelist[0]=="programme"){
		var root_elems=xml_root.getElementsByTagName("programme");
		}
		
	if(root_elems==undefined || root_elems.length<=xmlid){
		console.log("Tried to access element "+path+" with xmlid "+xmlid+" but list is too short!")
		return
		}
	
	var pointer=root_elems[xmlid];
	for (var i=1;i<nodelist.length;i++){
		var tp = pointer.getElementsByTagName(nodelist[i]);
		if (tp == undefined || tp.length<1) {
			var new_pnode=xml_root.createElement(nodelist[i]);
			pointer.appendChild(new_pnode);
			var tp = pointer.getElementsByTagName(nodelist[i]);
		}
		pointer=tp[0];
	}
	
	if (isattr){
		pointer.setAttribute(path_parts[1],inputval);
	}else{
		var textnode=get_firstChild(pointer);
		if(textnode==undefined){
			var textnode=xml_root.createTextNode(inputval);
			pointer.appendChild(textnode);
			}
		else{
			textnode.nodeValue=inputval;
		}
	}
	
	}

function populate_list(category){
	if(category=="ads"){
		var xmlDoc=xml_db_ads;
		var entries=xmlDoc.getElementsByTagName("ad");
		var paths=ad_paths;
		var title_path="ad#title#de";
		var sample=$('#box_ads #sample_entry');
	}
	if(category=="news"){
		var xmlDoc=xml_db_news;
		var entries=xmlDoc.getElementsByTagName("news");
		var paths=news_paths;
		var title_path="news#title#de";
		var sample=$('#box_news #sample_entry');
	}
	if(category=="people"){
		var xmlDoc=xml_db_people;
		var entries=xmlDoc.getElementsByTagName("person");
		var paths=people_paths;
		var title_path="person#last_name";
		var sample=$('#box_people #sample_entry');
	}
	if(category=="programme"){
		var xmlDoc=xml_db_programme;
		var entries=xmlDoc.getElementsByTagName("programme");
		var paths=programme_paths;
		var title_path="programme#title#de";
		var sample=$('#box_programme #sample_entry');
	}
	for (var xml_i=0; xml_i<entries.length; xml_i++){
		var entry=$(sample).clone();		
		$(entry).prop('id','');
		$(entry).find('#xmldocindex').val(xml_i);
		
		for (var elem_i=0; elem=paths[elem_i]; elem_i++){
			var val=getElementByIdAndPath(xml_i, elem, xmlDoc);
			var input=$(entry).find('input[name="'+elem+'"]');
			if (input.length<1){
				var input=$(entry).find('textarea[name="'+elem+'"]');
				}
			if (input.length>0){
				$(input).val(val);
				$(input).parents('td').attr('data-sort',val);
				}
		}
		$(entry).find('.titlebar').text($(entry).find('input[name="'+title_path+'"]').val());	

		if(category=="people"){
				$(entry).find('.titlebar').text($(entry).find('input[name="'+title_path+'"]').val()+", "+$(entry).find('input[name="person#first_name"]').val());	
		}		
		$('#box_'+category+' #db_entries_body').append(entry);
	}
	if(category=="ads"){
		$('#box_ads p.entries_count').text(entries.length+' Einträge');
		$('#box_ads #db_entries').show();
		$('#create_new_ad_btn').show();
		}
	if(category=="news"){
		$('#box_news p.entries_count').text(entries.length+' Einträge');
		$('#box_news #db_entries').show();
		$('#create_new_news_btn').show();
		
		$('#box_news .entry td.filt').hide();
		$('#box_news .entry td.filt1').show();
		$('input[name="news_tabmode"]').filter('[value="1"]').click();
		
		var o=$("#box_news #db_entries");
		new Tablesort(o[0], {
  descending: true
});
		
		
		}
	if(category=="people"){
		$('#box_people p.entries_count').text(entries.length+' Einträge');
		$('#box_people #db_entries').show();
		$('#create_new_person_btn').show();
		}
	if(category=="programme"){
		$('#box_programme p.entries_count').text(entries.length+' Einträge');
		$('#box_programme #db_entries').show();
		$('#create_new_programme_btn').show();
		}
}


function handleFileSelect(evt) {
	var that=this;
	var myfile = evt.target.files[0];
	var freader = new FileReader();
	freader.readAsText(myfile);
	freader.onload=function(){
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(freader.result, "text/xml");
		
		if($(that).prop('id')=="ad_btnload"){
			xml_db_ads=xmlDoc;
			populate_list('ads');
			$('#ad_btnsave').show();
		}
		if($(that).prop('id')=="news_btnload"){
			xml_db_news=xmlDoc;
			populate_list('news');
			$('#news_btnsave').show();
		}
		if($(that).prop('id')=="people_btnload"){
			xml_db_people=xmlDoc;
			populate_list('people');
			$('#people_btnsave').show();
		}
		if($(that).prop('id')=="programme_btnload"){
			xml_db_programme=xmlDoc;
			populate_list('programme');
			$('#programme_btnsave').show();
		}
		}

	}
	
function manipulate_ad(inputval,inputname,xmldocindex){
	setElementByIdAndPath(inputval,xmldocindex,inputname,xml_db_ads);
	if(inputname=="ad#title#de"){
		$('input#xmldocindex[value="'+xmldocindex+'"]').parents('.entry').find('.titlebar').text(inputval);
	}
}

function manipulate_news(inputval,inputname,xmldocindex,elem){
	setElementByIdAndPath(inputval,xmldocindex,inputname,xml_db_news);
	if(inputname=="news#title#de"){
		$('input#xmldocindex[value="'+xmldocindex+'"]').parents('.entry').find('.titlebar').text(inputval);
	}
	$(elem).parents('td').attr('data-sort',inputval);
}

function manipulate_person(inputval,inputname,xmldocindex){
	setElementByIdAndPath(inputval,xmldocindex,inputname,xml_db_people);
	if(inputname=="person#last_name"){
		$('input#xmldocindex[value="'+xmldocindex+'"]').parents('.entry').find('.titlebar').text(inputval);
	}
}

function manipulate_programme(inputval,inputname,xmldocindex){
	setElementByIdAndPath(inputval,xmldocindex,inputname,xml_db_programme);
	if(inputname=="programme#title#de"){
		$('input#xmldocindex[value="'+xmldocindex+'"]').parents('.entry').find('.titlebar').text(inputval);
	}
}

function create_new_ad(){
	var ads=xml_db_ads.getElementsByTagName("allads");
	ads=ads[0];
	var new_pnode=xml_db_ads.createElement('ad');
	var new_tnode=xml_db_ads.createElement('title');
	var new_denode=xml_db_ads.createElement('de');
	var textnode=xml_db_ads.createTextNode('Neuer Werbespot (bitte bearbeiten!)');
	new_denode.appendChild(textnode);
	new_tnode.appendChild(new_denode);
	new_pnode.appendChild(new_tnode);
	ads.appendChild(new_pnode);
	$('#box_ads').find('.entry').each(function(){if($(this).prop('id')!="sample_entry"){$(this).remove();}});
	populate_list('ads');
	
	$('#box_ads .entry').last().find('.collapsable').show();
}

function create_new_news(){
	var ads=xml_db_news.getElementsByTagName("allnews");
	ads=ads[0];
	var new_pnode=xml_db_news.createElement('news');
	var new_tnode=xml_db_news.createElement('title');
	var new_denode=xml_db_news.createElement('de');
	var textnode=xml_db_news.createTextNode('Neue Newsmeldung (bitte bearbeiten!)');
	new_denode.appendChild(textnode);
	new_tnode.appendChild(new_denode);
	new_pnode.appendChild(new_tnode);
	ads.appendChild(new_pnode);
	$('#box_news').find('.entry').each(function(){if($(this).prop('id')!="sample_entry"){$(this).remove();}});
	populate_list('news');
	
	$('#box_news .entry').last().find('.collapsable').show();
}

function create_new_person(){
	var ads=xml_db_news.getElementsByTagName("celebritypeople");
	ads=ads[0];
	var new_pnode=xml_db_news.createElement('person');
	var new_denode=xml_db_news.createElement('last_name');
	var textnode=xml_db_news.createTextNode('Neue Person (bitte bearbeiten!)');
	new_denode.appendChild(textnode);
	new_pnode.appendChild(new_denode);
	ads.appendChild(new_pnode);
	$('#box_people').find('.entry').each(function(){if($(this).prop('id')!="sample_entry"){$(this).remove();}});
	populate_list('people');
	
	$('#box_people .entry').last().find('.collapsable').show();
}

function NewsThreadEditorApply(){
	var editor=$( "#threadeditor" );
	var kette=$( "#threadeditor" ).find('#newsthreadeditor_ketteid').val();
	var xmlid=$(editor).find('#newsthreadeditor_id').val();
	var triggerlink=$("input[name=\"news_threadselector\"]:checked").val();
	
	if(triggerlink==""){
		var trigger="";
		var triggertype="";
	}else{
		var trigger="happen";
		var triggertype="triggernews";
		}
		
	var row=$( "#threadeditor" )[0].affectedrow;
	$(row).find("input[name='news.thread_id']").val(kette).change();
	$(row).find("input[name='news#effects#effect.news']").val(triggerlink).change();
	$(row).find("input[name='news#effects#effect.trigger']").val(trigger).change();
	$(row).find("input[name='news#effects#effect.type']").val(triggertype).change();
	
	console.log(row);
		
	$(editor).dialog('close');
}

function openNewsThreadEditor(elem){
	var par=$(elem).parents('.entry');
	var xmlid=$(par).find("input[name='xmldocindex']").val();
	var newsid=$(par).find("input[name='news.id']").val();
	var newstitle=$(par).find("input[name='news#title#de']").val();
	var newskette=$(par).find("input[name='news.thread_id']").val();
	var selected=$(par).find("input[name='news#effects#effect.news']").val();
	$( "#threadeditor" ).find('#newsthreadeditor_id').text(newsid);
	$( "#threadeditor" ).find('#newsthreadeditor_titel').text(newstitle);
	$( "#threadeditor" ).find('#newsthreadeditor_ketteid').val(newskette);
	$( "#threadeditor" ).find('#newsthreadeditor_triggerlist').empty();
	$( "#threadeditor" ).find('#newsthreadeditor_xmlid').val(xmlid);
	
	$( "#threadeditor" )[0].affectedrow=par;
	
	var ul = $('<ul></ul>');
	var checked="";
	if(selected==""){
		checked="checked";
		}
	$(ul).append("<li><input "+checked+" type='radio' name=\"news_threadselector\" value=\"\">nichts</li>");
	$('#box_news #db_entries_body .entry').each(function(){
		var tid=$(this).find("input[name='news.thread_id']").val();
		console.log(tid);
		if(tid==newskette){
			var nid=$(this).find("input[name='news.id']").val();
			var ntit=$(this).find("input[name='news#title#de']").val();
			if(nid!=newsid){
					var checked="";
					if(selected==nid){
						checked="checked";
						}
			
				$(ul).append("<li><input "+checked+" type='radio' value=\""+nid+"\" name=\"news_threadselector\">"+ntit+"</input></li>");
				}
			}
	});
	
	$( "#threadeditor" ).find('#newsthreadeditor_triggerlist').append(ul);
	
	dialog = $( "#threadeditor" ).dialog({
		  autoOpen: true,
		  height: 500,
		  width: 500,
		  modal: true,
		});
}

function create_new_programme(){
	var ads=xml_db_programme.getElementsByTagName("allprogrammes");
	ads=ads[0];
	var new_pnode=xml_db_programme.createElement('programme');
	var new_tnode=xml_db_programme.createElement('title');
	var new_denode=xml_db_programme.createElement('de');
	var textnode=xml_db_programme.createTextNode('Neue Sendung (bitte bearbeiten!)');
	new_denode.appendChild(textnode);
	new_tnode.appendChild(new_denode);
	new_pnode.appendChild(new_tnode);
	ads.appendChild(new_pnode);
	$('#box_programme').find('.entry').each(function(){if($(this).prop('id')!="sample_entry"){$(this).remove();}});
	populate_list('programme');
	
	$('#box_programme .entry').last().find('.collapsable').show();
}

$(document).ready(function(){
	document.getElementById('ad_btnload').addEventListener('change', handleFileSelect, false);
	document.getElementById('news_btnload').addEventListener('change', handleFileSelect, false);	
	document.getElementById('people_btnload').addEventListener('change', handleFileSelect, false);
	document.getElementById('programme_btnload').addEventListener('change', handleFileSelect, false);
	
	$(document).on('click','#db_entries .titlebar',function(){$('#db_entries .collapsable').hide();$(this).parent().find('.collapsable').show();});
	
	$(document).on('change','input[name="news_tabmode"]',function(){
		var v=$(this).val();
		if(v<4){
			$('#box_news th.filt').hide();
			$('#box_news td.filt').hide();
			$('#box_news td.filt'+v).show();
			$('#box_news th.filt'+v).show();
		}else{
			$('#box_news td.filt').show();
			$('#box_news th.filt').show();
		}
		});
	
	$(document).on('change','#db_entries .entry input,#db_entries .entry textarea',function(){
		var xmldocindex=$(this).parents('.entry').find('#xmldocindex').val();
		var par_id=$(this).parents('.category_box').prop('id');
		if(par_id=="box_ads"){
			manipulate_ad($(this).val(),$(this).prop('name'), xmldocindex);		
		}
		if(par_id=="box_news"){
			manipulate_news($(this).val(),$(this).prop('name'), xmldocindex, this)		
		}
		if(par_id=="box_people"){
			manipulate_person($(this).val(),$(this).prop('name'), xmldocindex)		
		}
		if(par_id=="box_programme"){
			manipulate_programme($(this).val(),$(this).prop('name'), xmldocindex)		
		}
	});
	
	
	

	

});

