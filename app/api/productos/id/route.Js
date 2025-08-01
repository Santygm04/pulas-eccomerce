import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DB_PATH = path.join(process.cwd(), "data", "productos.json")

function readProductos() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, "utf8")
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error("Error reading productos:", error)
    return []
  }
}

function writeProductos(productos) {
  try {
    const dataDir = path.dirname(DB_PATH)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(productos, null, 2))
  } catch (error) {
    console.error("Error writing productos:", error)
    throw error
  }
}

// DELETE - Eliminar producto
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const productos = readProductos()

    const index = productos.findIndex((p) => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    productos.splice(index, 1)
    writeProductos(productos)

    return NextResponse.json({ message: "Producto eliminado correctamente" })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar producto" }, { status: 500 })
  }
}

// PATCH - Actualizar stock específico
export async function PATCH(request, { params }) {
  try {
    const { id } = params
    const { talle, color, cantidad } = await request.json()
    const productos = readProductos()

    const index = productos.findIndex((p) => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    if (!productos[index].stock) {
      productos[index].stock = {}
    }
    if (!productos[index].stock[talle]) {
      productos[index].stock[talle] = {}
    }

    productos[index].stock[talle][color] = cantidad
    writeProductos(productos)

    return NextResponse.json(productos[index])
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar stock" }, { status: 500 })
  }
}
