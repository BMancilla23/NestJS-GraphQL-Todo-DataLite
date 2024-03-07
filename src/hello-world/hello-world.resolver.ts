import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

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
    @Query(() => Int, {name: 'randomFromZeroTo', description: 'From zero to argument TO'})
    getRandomFromZeroTo( @Args('to', {nullable: true  ,type: () => Int}) to: number = 6): number{
        return Math.floor(Math.random() * to);  // int
    }
}


