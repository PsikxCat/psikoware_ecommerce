// ! this is dummy data while we make the user interface, eventually we will fetch data from the database

export const products = [
  {
    id: '64a654593e91b8e73a351e9b',
    name: 'iphone 14',
    description: 'Short description',
    price: 2999,
    brand: 'apple',
    category: 'Phone',
    inStock: true,
    images: [
      {
        color: 'White',
        colorCode: '#FFFFFF',
        image:
          '/images/products/Board_Asus_ROG_Strix_B550-E_Gaming_WIFI_Ryzen_DDR4.webp'
      },
      {
        color: 'Gray',
        colorCode: '#808080',
        image:
          'https://firebasestorage.googleapis.com/v0/b/ecommerce-shop-cc542.appspot.com/o/products%2F1688622165836-iphone14-gray.png?alt=media&token=58f684db-998e-43eb-aa06-efe3d6ccfad4'
      }
    ],
    reviews: []
  },
  {
    id: '64a4ebe300900d44bb50628a',
    name: 'Logitech MX Keys Advanced Wireless Illuminated Keyboard, Tactile Responsive Typing, Backlighting, Bluetooth, USB-C, Apple macOS, Microsoft Windows, Linux, iOS, Android, Metal Build (Black)',
    description:
      'PERFECT STROKE KEYS - Spherically-dished keys match the shape of your fingertips, offering satisfying feedback with every tap\nCOMFORT AND STABILITY - Type with confidence on a keyboard crafted for comfort, stability, and precision',
    price: 13899000,
    brand: 'logitech',
    category: 'Accesories',
    inStock: true,
    images: [
      {
        color: 'Black',
        colorCode: '#000000',
        image:
          '/images/products/Board_GIGABYTE_B550_AORUS_MASTER_WIFI_Ryzen_DDR4_AM4.webp'
      }
    ],
    reviews: [
      {
        id: '64a65a6158b470c6e06959ee',
        userId: '6475af156bad4917456e6e1e',
        productId: '64a4ebe300900d44bb50628a',
        rating: 5,
        comment: 'good',
        createdDate: '2023-07-06T06:08:33.067Z',
        user: {
          id: '6475af156bad4917456e6e1e',
          name: 'Charles',
          email: 'example@gmail.com',
          emailVerified: null,
          image:
            'https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c',
          hashedPassword: null,
          createdAt: '2023-05-30T08:08:53.979Z',
          updatedAt: '2023-05-30T08:08:53.979Z',
          role: 'ADMIN'
        }
      }
    ]
  },
  {
    id: '648437b38c44d52b9542e340',
    name: 'Apple iPhone 12, 64GB',
    description:
      'The product is refurbished, fully functional, and in excellent condition. Backed by the 90-day E~Shop Renewed Guarantee.\n- This pre-owned product has been professionally inspected, tested and cleaned by Amazon qualified vendors. It is not certified by Apple.\n- This product is in "Excellent condition". The screen and body show no signs of cosmetic damage visible from 12 inches away.\n- This product will have a battery that exceeds 80% capacity relative to new.\n- Accessories may not be original, but will be compatible and fully functional. Product may come in generic box.\n- Product will come with a SIM removal tool, a charger and a charging cable. Headphone and SIM card are not included.\n- This product is eligible for a replacement or refund within 90-day of receipt if it does not work as expected.\n- Refurbished phones are not guaranteed to be waterproof.',
    price: 40,
    brand: 'Apple',
    category: 'Phone',
    inStock: true,
    images: [
      {
        color: 'Black',
        colorCode: '#000000',
        image:
          '/images/products/GPU_Asus_ROG_Strix_RTX_3080_TI_Gaming_12GB_GDDR6X_OC.webp'
      },
      {
        color: 'Blue',
        colorCode: ' #0000FF',
        image:
          'https://firebasestorage.googleapis.com/v0/b/ecommerce-shop-cc542.appspot.com/o/products%2F1686386607274-iphone12-blue.jpg?alt=media&token=e83a9b13-86b6-4518-9f1e-8ddef12ba9a2'
      },
      {
        color: 'Red',
        colorCode: '#FF0000',
        image:
          'https://firebasestorage.googleapis.com/v0/b/ecommerce-shop-cc542.appspot.com/o/products%2F1686386608652-iphone12-red.jpg?alt=media&token=603a9e86-5b8c-4f8d-b61c-c1c77e60e954'
      }
    ],
    reviews: [
      {
        id: '6499b4887402b0efd394d8f3',
        userId: '6499b184b0e9a8c8709821d3',
        productId: '648437b38c44d52b9542e340',
        rating: 4,
        comment:
          'good enough. I like the camera and casing. the delivery was fast too.',
        createdDate: '2023-06-26T15:53:44.483Z',
        user: {
          id: '6499b184b0e9a8c8709821d3',
          name: 'Chaoo',
          email: 'example1@gmail.com',
          emailVerified: null,
          image:
            'https://lh3.googleusercontent.com/a/AAcHTtcuRLwWi1vPKaQOcJlUurlhRAIIq2LgYccE8p32=s96-c',
          hashedPassword: null,
          createdAt: '2023-06-26T15:40:52.558Z',
          updatedAt: '2023-06-26T15:40:52.558Z',
          role: 'USER'
        }
      },
      {
        id: '6499a110efe4e4de451c7edc',
        userId: '6475af156bad4917456e6e1e',
        productId: '648437b38c44d52b9542e340',
        rating: 5,
        comment: 'I really liked it!!',
        createdDate: '2023-06-26T14:30:40.998Z',
        user: {
          id: '6475af156bad4917456e6e1e',
          name: 'Charles',
          email: 'example@gmail.com',
          emailVerified: null,
          image:
            'https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c',
          hashedPassword: null,
          createdAt: '2023-05-30T08:08:53.979Z',
          updatedAt: '2023-05-30T08:08:53.979Z',
          role: 'ADMIN'
        }
      }
    ]
  },
  {
    id: '64a4e9e77e7299078334019f',
    name: 'Logitech MX Master 2S Wireless Mouse – Use on Any Surface, Hyper-Fast Scrolling, Ergonomic Shape, Rechargeable, Control Upto 3 Apple Mac and Windows Computers, Graphite',
    description:
      'Cross computer control: Game changing capacity to navigate seamlessly on 3 computers, and copy paste text, images, and files from 1 to the other using Logitech flow\nDual connectivity: Use with upto 3 Windows or Mac computers via included Unifying receiver or Bluetooth Smart wireless technology. Gesture button- Yes',
    price: 70,
    brand: 'logitech',
    category: 'Accesories',
    inStock: true,
    images: [
      {
        color: 'Graphite',
        colorCode: ' #383838',
        image:
          '/images/products/Procesador_AMD_Ryzen_5_5600X_3.7GHz.webp'
      }
    ],
    reviews: []
  },
  {
    id: '649d775128b6744f0f497040',
    name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
    description:
      'Bluetooth Call and Message Reminder: The smart watch is equipped with HD speaker, after connecting to your phone via Bluetooth, you can directly use the smartwatches to answer or make calls, read messages, store contacts, view call history. The smartwatch can set up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
    price: 50,
    brand: 'Nerunsa',
    category: 'Watch',
    inStock: true,
    images: [
      {
        color: 'Black',
        colorCode: '#000000',
        image:
          '/images/products/Procesador_AMD_Ryzen_7_5800X_3.8GHz.webp'
      },
      {
        color: 'Silver',
        colorCode: '#C0C0C0',
        image:
          'https://firebasestorage.googleapis.com/v0/b/ecommerce-shop-cc542.appspot.com/o/products%2F1688041295389-watch-silver.jpg?alt=media&token=7341e7f0-5c29-4f91-a7e3-57e50faafb74'
      }
    ],
    reviews: []
  }
]

export const product = {
  id: '64a654593e91b8e73a351e9b',
  name: 'iPhone 14, 128GB',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore voluptates obcaecati odio recusandae inventore sed unde dolorem, quasi necessitatibus beatae est, praesentium perspiciatis libero esse. Inventore aliquid fuga quo enim saepe id eum sequi sapiente amet? Molestiae adipisci perferendis vitae eveniet vel, repudiandae consequatur! Expedita iure at minima suscipit provident tenetur totam necessitatibus sit, nemo a, obcaecati commodi harum aliquam repellendus temporibus, debitis rerum. Nobis aliquam animi neque quidem voluptatem natus, nisi quasi ullam dolorum, rerum incidunt possimus laudantium odio numquam maxime laboriosam vero nostrum accusamus.',
  price: 2999,
  brand: 'Apple',
  category: 'Celular',
  inStock: true,
  images: [
    {
      color: 'White',
      colorCode: '#FFFFFF',
      image:
        '/images/products/Board_Asus_ROG_Strix_B550-E_Gaming_WIFI_Ryzen_DDR4.webp'
    },
    {
      color: 'Gray',
      colorCode: '#808080',
      image:
        'https://firebasestorage.googleapis.com/v0/b/ecommerce-shop-cc542.appspot.com/o/products%2F1688622165836-iphone14-gray.png?alt=media&token=58f684db-998e-43eb-aa06-efe3d6ccfad4'
    }
  ],
  reviews: [
    {
      id: '64a65a6158b470c6e06959ee',
      userId: '6475af156bad4917456e6e1e',
      productId: '64a4ebe300900d44bb50628a',
      rating: 5,
      comment: 'good',
      createdDate: '2023-07-06T06:08:33.067Z',
      user: {
        id: '6475af156bad4917456e6e1e',
        name: 'Charles',
        email: 'example@gmail.com',
        emailVerified: null,
        image:
          'https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c',
        hashedPassword: null,
        createdAt: '2023-05-30T08:08:53.979Z',
        updatedAt: '2023-05-30T08:08:53.979Z',
        role: 'ADMIN'
      }
    },
    {
      id: '64a65a6158b470c6e06959e2',
      userId: '6475af156bad4917456e6e1e',
      productId: '64a4ebe300900d44bb50628a',
      rating: 4,
      comment: 'good item',
      createdDate: '2023-07-06T06:08:33.067Z',
      user: {
        id: '6475af156bad4917456e6e1e',
        name: 'Charles',
        email: 'example@gmail.com',
        emailVerified: null,
        image:
          'https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c',
        hashedPassword: null,
        createdAt: '2023-05-30T08:08:53.979Z',
        updatedAt: '2023-05-30T08:08:53.979Z',
        role: 'ADMIN'
      }
    }
  ]
}