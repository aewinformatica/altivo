module.exports = {
  name: 'generate:dboffline',
  description: 'Create table inside src/schemas',
  run: async (toolbox) => {
    const { parameters, createTable, print } = toolbox

    if (parameters.array.length === 0) {
      print.error('Invalid arguments!')

      print.info(
        'Name at least on table. Ex: generate:dboffline table1 table2 ...'
      )

      return
    }

    for (var i = 0; i < parameters.array.length; i++) {
      let path = parameters.array[i].split(toolbox.filesystem.separator)
      path = path.map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      const name = path[path.length - 1]
      path.pop()
      path = path.join(`${toolbox.filesystem.separator}`)

      await createTable(
        `src/schemas/${path && path + toolbox.filesystem.separator}`,
        name
      )

      if (parameters.options.schemas) {
        toolbox.filesystem.append(
          'src/services/realm.js',
          `import ${name} from './schemas/${
            path && path + toolbox.filesystem.separator
          }${name}';\n`
        )
      }
    }
  },
}
