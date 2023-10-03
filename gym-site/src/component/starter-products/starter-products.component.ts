import { Component } from '@angular/core';
import { ProductsService } from 'src/Service/products/products.service';
import { product } from 'src/models/product.model';

@Component({
  selector: 'app-starter-products',
  templateUrl: './starter-products.component.html',
  styleUrls: ['./starter-products.component.scss'],
  providers: [ProductsService]
})
export class StarterProductsComponent {

  constructor(private productService: ProductsService) { }


  addAllProducts() {
    for (const product of this.starterProducts) {
      product.id = '00000000-0000-0000-0000-000000000000';
      //product.image = "System.Runtime.CompilerServices.AsyncTaskMethodBuilder`1+AsyncStateMachineBox`1[System.Byte[],System.IO.File+<InternalReadAllBytesAsync>d__70]";
      product.image = "";
      this.productService.addProduct(product).subscribe({
        next: (response) => {
          console.log('Product added successfully:', response);
          window.location.reload();
          window.location.reload();
        },
        error: (error) => {
          console.error('Error adding product:', error);
        },
      });
    }
  }



  starterProducts: product[] = [
    {
      id: '',
      image: '',
      name: 'TRX',
      price: 55,
      available: 37,
      read: 'Introducing TRX - the magical fitness genie that lives in your home. It grants you the power to sculpt muscles you didn`t even know existed.'
  },
    {
      id: '',
      image: '',
      name: 'Bench',
      price: 160,
      available: 13,
      read: 'Introducing the Bench - your ticket to the ultimate chest gains. Its your best buddy for those bench press goals. Just remember, with great power comes great responsibility(and maybe a spotter).'
  },
    {
      id: '',
      image: '',
      name: 'Bike Machine',
      price: 70,
      available: 10,
      read: 'Always wanted to ride a bike but don`t know how to balance? Meet the Bike Machine - the perfect cardio workout companion. It won`t teach you how to ride a real bike, but hey, close enough!'
    },
    {
      id: '',
      image: '',
      name: 'Chest Machine',
      price: 70,
      available: 10,
      read: 'Get that chiseled chest you`ve always dreamed of with our Chest Machine. It`s so safe even your grandma could become a chest-pressing champion!'
    },
    {
      id: '',
      image: '',
      name: 'Raw Machine',
      price: 70,
      available: 10,
      read: 'Raw, Raw, Raw!'
    },
    {
      id: '',
      image: '',
      name: 'Leg Press',
      price: 70,
      available: 10,
      read: 'Feeling like someone`s been skipping leg day? Not anymore! Our Leg Press machine will have you saying, "Who hurt you?" to those quads.'
    },
    {
      id: '',
      image: '',
      name: 'Treadmills',
      price: 70,
      available: 10,
      read: 'Running at home just got real. No more excuses to skip cardio - our Treadmills are here to keep you on track!'
    },
    {
      id: '',
      image: '',
      name: 'Jump Ropes',
      price: 70,
      available: 10,
      read: 'Jump till you fall, and then jump again. Our Jump Ropes will have you leaping towards fitness one skip at a time!'
    },
    {
      id: '',
      image: '',
      name: 'Brownie',
      price: 10,
      available: 20,
      read: 'Our delicious Brownies are here to satisfy your sweet tooth. Cheat day? More like treat day!'
    },
    {
      id: '',
      image: '',
      name: 'Cookie',
      price: 5,
      available: 30,
      read: 'Homemade goodness in every bite. Our Cookies are like a warm hug for your taste buds.'
    },
    {
      id: '',
      image: '',
      name: 'Creatine',
      price: 15,
      available: 25,
      read: 'Boost your workout performance with Creatine. It`s like giving your muscles a secret superpower!'
    },
    {
      id: '',
      image: '',
      name: 'Dumbbells',
      price: 40,
      available: 15,
      read: 'Versatile and cool, just like you. Our Dumbbells are your new best friends in the gym.'
    },
    {
      id: '',
      image: '',
      name: 'Mats',
      price: 20,
      available: 50,
      read: 'Yoga, stretching, or just lounging around - our Mats have got your back (literally).'
    },
    {
      id: '',
      image: '',
      name: 'Pancake',
      price: 8,
      available: 40,
      read: 'Pancakes for breakfast? Heck, why not have them for lunch and dinner too! Our Pancakes are flippin\' fantastic!'
    },
    {
      id: '',
      image: '',
      name: 'Protein Whey',
      price: 25,
      available: 30,
      read: 'High-quality Protein Whey for muscle recovery. Because who needs superheroes when you have Protein Whey?'
    },
    {
      id: '',
      image: '',
      name: 'Raw Machine',
      price: 70,
      available: 10,
      read: 'Raw, raw, raw! (Seriously, we`re still not sure what this does, but it sounds cool, right?)'
    },
    {
      id: '',
      image: '',
      name: 'Resistance Bands',
      price: 15,
      available: 20,
      read: 'Get ready to feel the burn! Our Resistance Bands are like your personal pocket-sized gym.'
    },
    {
      id: '',
      image: '',
      name: 'Shaker',
      price: 10,
      available: 35,
      read: 'Shake it til you make it! Our Shaker is your partner in crime for the smoothest protein shakes in town.'
  },
    {
      id: '',
      image: '',
      name: 'Tech',
      price: 200,
      available: 5,
      read: 'Unleash the power of tech in your workouts! With our Tech, you`ll be the coolest fitness guru in town.'
    },
    {
      id: '',
      image: '',
      name: 'Creatine2',
      price: 20,
      available: 15,
      read: 'The sequel to Creatine - Creatine2! Get ready for double the muscle gains and twice the workout swagger. You might even start flexing in your sleep!'
    },
    {
      id: '',
      image: '',
      name: 'Dumbbells2',
      price: 50,
      available: 10,
      read: 'Meet Dumbbells2 - no one will laugh at you no more when you lift them'
    },
    {
      id: '',
      image: '',
      name: 'Shaker2',
      price: 15,
      available: 25,
      read: 'Shaker2 - Because one shake just isn`t enough! Say goodbye to clumps and hello to the smoothest protein shakes ever!'
    }

  ];



}
