import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(() => String)
    hellowWorld(): string {
        return 'Hola Mundo'
    }
}
