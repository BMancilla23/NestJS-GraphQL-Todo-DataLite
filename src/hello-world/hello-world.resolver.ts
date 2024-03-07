import { Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(() => String, {description: 'Hola Mundo es lo que retorna', name: 'hello'})
    hellowWorld(): string {
        return 'Hola Mundo'
    }

    @Query(() => Float, {name: 'randomNumber'})
    getRandomNumber(): Number{
        return Math.random() * 100;
    }

    // randomFromZeroTo
    @Query(() => Int, {name: 'randomFromZeroTo'})
    getRandomFromZeroTo(): number{
        return Math.floor(Math.random() * 10);  // int
    }
}


