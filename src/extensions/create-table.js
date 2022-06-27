module.exports = (toolbox) => {
    const { filesystem, template, print: { success, error } } = toolbox;
  
    async function isReactNative() {
      const package = await filesystem.read('package.json', 'json');
  
      return !!package.dependencies['react-native'];
    }
  
    async function createTable(folder, name) {
      if (!name) {
        error('Name must be specified');
        return
      }
  
      await template.generate({
        template: 'table-realm.js.ejs',
        target: `${folder}/${name}.js`,
        props: { name,id:name.toLowerCase() },
      })
    
      success(`Generated ${folder}${name}.`)
    }
  
    toolbox.createTable = createTable
  };