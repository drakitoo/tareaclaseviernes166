
import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  NotFoundException,
  Res,
  HttpCode,
} from '@nestjs/common';
import type { Response } from 'express';
import { LibrosService } from './libros.service';

@Controller('libros')
export class LibrosController {
  constructor(private readonly librosService: LibrosService) {}

  @Get()
  findAll(@Query('autor') autor?: string) {
    return this.librosService.findAll(autor);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const libro = this.librosService.findOne(id);

    if (!libro) {
      throw new NotFoundException('Libro no encontrado');
    }

    return libro;
  }

  @Post()
  create(
    @Body() datos: { titulo: string; autor: string; disponible: boolean },
    @Res({ passthrough: true }) res: Response,
  ) {
    const libro = this.librosService.create(datos);
    res.location(`/libros/${libro.id}`);
    res.status(201);
    return libro;
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: { titulo: string; autor: string; disponible: boolean },
  ) {
    const libro = this.librosService.update(id, datos);

    if (!libro) {
      throw new NotFoundException('Libro no encontrado');
    }

    return libro;
  }

  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: Partial<{
      titulo: string;
      autor: string;
      disponible: boolean;
    }>,
  ) {
    const libro = this.librosService.patch(id, datos);

    if (!libro) {
      throw new NotFoundException('Libro no encontrado');
    }

    return libro;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    const eliminado = this.librosService.remove(id);

    if (!eliminado) {
      throw new NotFoundException('Libro no encontrado');
    }
  }
}
