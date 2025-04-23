# Dumb Standard
A hodge podge of standard algorithms and data structures I keep having to write so I've slapped it all together into a standard library. A Dumb one. 

> Why dumb standard?

It's kinda dumb there's no easy to reach for, high performance-ish standard library to accomplish standard tasks. The closest we have is lodash

> So this is high performance?

No. But it ain't bad

> Why not just install X, Y and Z from npm?

I don't want to be exposed to some left pad shenanigans

## Installation

```bash
npm install dumb-standard
# or
yarn add dumb-standard
```

## Usage

```typescript
import { binarySearch, LinkedList, isValidEmail } from 'dumb-standard';

// Use the algorithms and data structures
const result = binarySearch([1, 2, 3, 4, 5], 3);
const list = new LinkedList();
const isValid = isValidEmail('example@example.com');
```

## Features

- Algorithms (searching, sorting, shuffling, etc.)
- Data structures (LinkedList, RingBuffer, LRU, etc.)
- String utilities (validation, formatting, etc.)
- Math utilities (random number generation, probability, etc.)
- Promise utilities
- Node.js utilities

## License

Microsoft Public License (Ms-PL)
