
import { Injectable } from '@nestjs/common';

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  disponible: boolean;
}

@Injectable()
export class LibrosService {
  private libros: Libro[] = [
    {
      id: 1,
      titulo: 'Cien años de soledad',
      autor: 'García Márquez',
      disponible: true,
    },
    {
      id: 2,
      titulo: 'El túnel',
      autor: 'Sabato',
      disponible: true,
    },
    {
      id: 3,
      titulo: 'Rayuela',
      autor: 'Cortázar',
      disponible: false,
    },
  ];

  private siguienteId = 4;

  findAll(autor?: string): Libro[] {
    if (autor) {
      return this.libros.filter((libro) =>
        libro.autor.toLowerCase().includes(autor.toLowerCase()),
      );
    }

    return this.libros;
  }

  findOne(id: number): Libro | undefined {
    return this.libros.find((libro) => libro.id === id);
  }

  create(datos: Omit<Libro, 'id'>): Libro {
    const libro: Libro = {
      id: this.siguienteId++,
      ...datos,
    };

    this.libros.push(libro);
    return libro;
  }

  update(
    id: number,
    datos: Omit<Libro, 'id'>,
  ): Libro | undefined {
    const indice = this.libros.findIndex((libro) => libro.id === id);

    if (indice === -1) return undefined;

    this.libros[indice] = { id, ...datos };
    return this.libros[indice];
  }

  patch(
    id: number,
    datos: Partial<Omit<Libro, 'id'>>,
  ): Libro | undefined {
    const libro = this.findOne(id);

    if (!libro) return undefined;

    Object.assign(libro, datos);
    return libro;
  }

  remove(id: number): boolean {
    const indice = this.libros.findIndex((libro) => libro.id === id);

    if (indice === -1) return false;

    this.libros.splice(indice, 1);
    return true;
  }
}
