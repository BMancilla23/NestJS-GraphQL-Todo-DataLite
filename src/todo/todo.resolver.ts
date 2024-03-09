import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto'
import { AgregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {

   constructor(
    private readonly todoService: TodoService
   ){}

    @Query(() => [Todo], {name: 'todos'})
    findAll(
        @Args() statusArgs: StatusArgs
    ): Todo[] {
        return this.todoService.findAll(statusArgs);
    }

    @Query(() => Todo, {name: 'todo'})
    findOne(@Args('id',{type: () => Int}) id: Number):Todo{
        return this.todoService.findOne(+id);
    }

    @Mutation(() => Todo, {name: 'createTodo'})
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ){
        return this.todoService.create(createTodoInput);
    }

    @Mutation(() => Todo, {name: 'updateTodo'})
    updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput){
        return this.todoService.update(updateTodoInput.id ,updateTodoInput);
    }

    @Mutation(() => Boolean, {name: 'removeTodo'})
    removeTodo(@Args('id', {type: () => Int})id:Number){
        return this.todoService.delete(+id);
    }

    // Agregations
    // TotalTodos
    @Query(() => Int, {name: 'totalTodos'})
    totalTodos(): number{
        return this.todoService.totalTodos;
    }

    // CompletedTodos
    @Query(() => Int, {name: 'pendingTodos'})
    pendingTodos(): number{
        return this.todoService.pendingTodos;
    }

    // PendingTodos
    @Query(() => Int, {name: 'completedTodos'})
    completedTodos(): number{
        return this.todoService.completedTodos;
    }

    @Query(() => AgregationsType)
    aggregations(): AgregationsType{
        return {
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos,
            totalTodosCompleted: this.todoService.totalTodos
        }
    }
}




