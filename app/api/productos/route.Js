import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DB_PATH = path.join(process.cwd(), "data", "productos.json")

// Asegurar que el directorio existe
function ensureDataDir() {
  const dataDir = path.dirname(DB_PATH)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Leer productos desde el archivo
function readProductos() {
  ensureDataDir()
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

// Escribir productos al archivo
function writeProductos(productos) {
  ensureDataDir()
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(productos, null, 2))
  } catch (error) {
    console.error("Error writing productos:", error)
    throw error
  }
}

// GET - Obtener todos los productos
export async function GET() {
  try {
    const productos = readProductos()
    return NextResponse.json(productos)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 })
  }
}

// POST - Crear nuevo producto
export async function POST(request) {
  try {
    const nuevoProducto = await request.json()
    const productos = readProductos()

    // Generar ID único
    const id = `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const productoConId = { ...nuevoProducto, id }

    productos.push(productoConId)
    writeProductos(productos)

    return NextResponse.json(productoConId, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear producto" }, { status: 500 })
  }
}

// PUT - Actualizar producto existente
export async function PUT(request) {
  try {
    const productoActualizado = await request.json()
    const productos = readProductos()

    const index = productos.findIndex((p) => p.id === productoActualizado.id)
    if (index === -1) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    productos[index] = productoActualizado
    writeProductos(productos)

    return NextResponse.json(productoActualizado)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar producto" }, { status: 500 })
  }
}
