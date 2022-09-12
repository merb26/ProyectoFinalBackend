const fs = require("fs")

class Container {
  constructor(nameFile) {
    this.nameFile = nameFile
  }
  /* -------------------------------------------------------------------------- */
  /*                                    save                                    */
  /* -------------------------------------------------------------------------- */
  async save(obj) {
    try {
      const contents = await fs.promises.readFile(this.nameFile, "utf-8")
      return this.writeSave(obj, JSON.parse(contents))
    } catch (error) {
      console.log(error)
      try {
        await fs.promises.writeFile(this.nameFile, "")
        return this.writeSave(obj)
      } catch (error) {
        console.log(error)
      }
    }
  }

  async writeSave(obj, contents) {
    try {
      let id

      if (contents) {
        if (contents.length === 0) {
          id = 1
        } else {
          contents.map(element => (id = element.id + 1))
        }

        contents.push({ ...obj, id: id })

        await fs.promises.writeFile(
          this.nameFile,
          JSON.stringify(contents, null, 2)
        )
        return { message: "Fue guardado con éxito" }
      } else {
        await fs.promises.writeFile(
          this.nameFile,
          JSON.stringify([{ ...obj, id: 1 }], null, 2)
        )

        id = 1
        return { message: "Fue guardado con éxito" }
      }
    } catch (error) {
      console.log(error)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                    update                                    */
  /* -------------------------------------------------------------------------- */
  async update(obj, isCar) {
    try {
      const contents = await fs.promises.readFile(this.nameFile, "utf-8")
      return this.writeUpdate(obj, JSON.parse(contents), isCar)
    } catch (error) {
      console.log(error)
    }
  }

  async writeUpdate(obj, contents) {
    try {
      if (contents) {
        let isFind = false
        for (const iterator of contents) {
          if (parseInt(obj.id) === iterator.id) {
            // product
            iterator.timestamp = obj.timestamp
            iterator.name = obj.name
            iterator.description = obj.description
            iterator.code = obj.code
            iterator.urlPicture = obj.urlPicture
            iterator.price = obj.price
            iterator.stock = obj.stock
            iterator.products = obj.products

            await fs.promises.writeFile(
              this.nameFile,
              JSON.stringify(contents, null, 2)
            )

            isFind = true

            return { message: "Se actualizó con éxito" }
          }
        }

        if (!isFind)
          return { message: "No se pudo encontrar el producto para modificar" }
      }
    } catch (error) {
      console.log(error)
      return { message: "No se pudo encontrar el producto para modificar" }
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                   getById                                  */
  /* -------------------------------------------------------------------------- */
  async getById(number) {
    try {
      let contents = await fs.promises.readFile(this.nameFile, "utf-8")
      contents = JSON.parse(contents)
      let isFind = false
      for (const iterator of contents) {
        if (iterator.id === parseInt(number)) {
          isFind = true
          return iterator
        }
      }
      if (!isFind)
        return {
          message: "No se pudo encontrar el producto",
        }
    } catch (error) {
      console.log(error)
      console.log("No hay productos, debe agregar un producto")
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                   getAll                                   */
  /* -------------------------------------------------------------------------- */
  async getAll() {
    try {
      let contents = await fs.promises.readFile(this.nameFile, "utf-8")
      return (contents = JSON.parse(contents))
    } catch (error) {
      console.log(error)
      console.log("No hay productos, debe agregar un producto")
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                 deleteById                                 */
  /* -------------------------------------------------------------------------- */
  async deleteById(number) {
    try {
      const contents = await fs.promises.readFile(this.nameFile, "utf-8")
      return this.writeDeleteById(number, JSON.parse(contents))
    } catch (error) {
      console.log(error)
      console.log("No hay productos almacenados")
      return { message: "No hay productos almacenados" }
    }
  }

  async writeDeleteById(number, contents) {
    try {
      let isFind = false
      for (let index = 0; index < contents.length; index++) {
        if (contents[index].id === parseInt(number)) {
          contents.splice(index, 1)
          isFind = true
          await fs.promises.writeFile(
            this.nameFile,
            JSON.stringify(contents, null, 2)
          )
          return { message: "El producto fue eliminado con éxito" }
        }
      }
      if (!isFind) return { message: "No existe el producto" }
    } catch (error) {
      console.log(error)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                  deleteAll                                 */
  /* -------------------------------------------------------------------------- */
  async deleteAll() {
    try {
      await fs.promises.unlink(this.nameFile)
      console.log("Eliminó todos los productos con éxito")
    } catch (error) {
      console.log(error)
      console.log("No hay productos")
    }
  }

  async replaceFile(object) {
    try {
      await fs.promises.writeFile(
        this.nameFile,
        JSON.stringify([object], null, 2)
      )
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Container
