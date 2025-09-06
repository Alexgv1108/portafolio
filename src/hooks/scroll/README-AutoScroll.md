# Auto-Scroll Hook

El hook `usePixiAutoScroll` permite que el scroll de la página se mueva automáticamente cuando el personaje se acerca a los bordes superior o inferior de la pantalla visible, y reposiciona inteligentemente al personaje después del scroll.

## Características

- **Scroll suave**: Utiliza `behavior: 'smooth'` para transiciones suaves
- **Cooldown**: Previene scrolls repetidos con un período de espera de 500ms
- **Configurable**: Permite ajustar el threshold y la distancia de scroll
- **Prevención de scroll hacia arriba en el top**: No hace scroll hacia arriba si ya estamos en el top de la página
- **Prevención de scroll hacia abajo en el bottom**: No hace scroll hacia abajo si ya estamos en el fondo de la página
- **Reposicionamiento inteligente**: Cuando se hace scroll hacia abajo, el personaje aparece en el top de la nueva vista y viceversa
- **Límites de movimiento mejorados**: El personaje tiene límites basados en sus dimensiones reales (167px × 250px) para mantenerse completamente visible en pantalla
- **Límites inteligentes**: Horizontales (84px) y verticales flexibles (62px) optimizados para auto-scroll

## Parámetros

- `getPosition`: Función que retorna la posición actual del personaje `{ x: number, y: number }`
- `moveCharacter`: Función para mover el personaje a una nueva posición
- `threshold`: Distancia desde el borde para activar el scroll (por defecto: 100px)
- `scrollDistance`: Distancia de scroll en vh (por defecto: 100vh)

## Comportamiento del Reposicionamiento

### Scroll hacia abajo (personaje cerca del bottom):
1. El scroll baja 100vh
2. El personaje se reposiciona en la parte superior de la nueva vista (threshold + 50px desde arriba)

### Scroll hacia arriba (personaje cerca del top):
1. El scroll sube 100vh
2. El personaje se reposiciona en la parte inferior de la nueva vista (threshold + 50px desde abajo)

## Verificaciones de Límites

El sistema incluye verificaciones inteligentes para evitar scrolls innecesarios:

### Límites de scroll superior:
- **Verificación**: `window.scrollY <= 10px` (con tolerancia de 10px)
- **Comportamiento**: No hace scroll hacia arriba si ya estás en el top

### Límites de scroll inferior:
- **Verificación**: `window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10px`
- **Comportamiento**: No hace scroll hacia abajo si ya estás en el fondo de la página

Esto asegura que el auto-scroll solo se active cuando realmente hay contenido disponible para mostrar.

## Integración

El hook está integrado automáticamente en `usePixiMovement`, por lo que se activa automáticamente cuando el personaje se mueve cerca de los bordes de la pantalla.

## Configuración

Las constantes se pueden ajustar en `constants/autoScrollConfig.ts`:

```typescript
export const AUTO_SCROLL_THRESHOLD = 100; // Distancia para activar scroll
export const AUTO_SCROLL_DISTANCE = 100; // Distancia de scroll en vh
export const AUTO_SCROLL_COOLDOWN = 1500; // Cooldown entre scrolls
export const AUTO_SCROLL_REPOSITION_DELAY = 50; // Delay para reposicionar
export const AUTO_SCROLL_REPOSITION_OFFSET = 50; // Offset al reposicionar

// Límites basados en las dimensiones reales del personaje
export const CHARACTER_BOUNDARY_HORIZONTAL = CHARACTER_WIDTH / 2; // ~83.5px
export const CHARACTER_BOUNDARY_VERTICAL_AUTOSCROLL = CHARACTER_HEIGHT / 4; // ~62.5px
```

### Límites Inteligentes

Los límites del personaje ahora se basan en sus dimensiones reales:

- **Horizontales**: `CHARACTER_WIDTH / 2` ≈ 83.5px (basado en ancho real del sprite)
- **Verticales para auto-scroll**: `CHARACTER_HEIGHT / 4` ≈ 62.5px (más permisivo para facilitar el scroll)

Esto asegura que:
1. El personaje nunca se corte visualmente en los bordes
2. Los límites respetan el tamaño real del sprite (250px alto × 167px ancho)
3. El anchor point (0.5, 0.5) está correctamente considerado
4. El auto-scroll se activa antes de llegar al límite físico

## Uso independiente

```typescript
const { checkAndScroll } = usePixiAutoScroll({ 
    getPosition,
    moveCharacter,
    threshold: 80,      // 80px desde el borde
    scrollDistance: 90  // 90vh de scroll
});

// Llamar cuando sea necesario verificar el scroll
checkAndScroll();
```
