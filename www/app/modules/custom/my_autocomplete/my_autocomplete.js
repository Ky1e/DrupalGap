/**
 * Implements hook_menu().
 */
function my_autocomplete_menu() {
  var items = {};
  items['my_autocomplete'] = {
    title: 'Autocomplete',
    page_callback: 'my_autocomplete_page'
  };
  return items;
}

/**
 * Page callback for autocomplete input.
 */
function my_autocomplete_page() {
  try {
    var content = {};
    content.my_autocomplete = {
      theme: 'autocomplete',
      item_onclick: 'my_autocomplete_item_onclick',
      remote: true,
      // basic path - while your view might be 'drupalgap/views_datasource/drupalgap_users/%', don't put the % here.
      path: 'json-out',
      // you need to specify the value, label and filter as zero-length strings, or things will break.
      value: '',
      label: '',
      filter: '',
      // you don't need these two settings here commented out, just don't use them at all.
      // custom: 'false',
      // handler: 'views'

      /* what we added to make contextual filters work */
      custom_theme: true,
      // if none are specified or "custom_theme" is not set to true, default is array( 'value', 'label' ). must be in order.
      theme_fields: [
        'title',
        'body',
        'field_cour_title_public',
        'value',
        'label'
      ],
      // this is your themable output string. this is what will show up in the result list. Note that you need to wrap your fieldnames in double curly braces.
      theme_map: l('{{title}} {{body}} {{field_cour_title_public}} {{value}} {{label}}'),
            // default behavior for filter_type is 'exposed', but the code won't look for 'exposed' necessarily
      filter_type: 'contextual',
      // if for some reason your view requires a specific URL structure (like, ~/search/users/%), you can describe this specifically in contextual_arg_structure.
      // for example: ['search','users','%'];
      contextual_arg_structure: ['%']
    };
   return content;
  }
  catch (error) { console.log('my_autocomplete_page - ' + error); }
}

function my_autocomplete_item_onclick(id, item) {
  console.log('List id: ' + id);
  drupalgap_alert("This will send to user path with ID of: " + $(item).attr('value'));
}