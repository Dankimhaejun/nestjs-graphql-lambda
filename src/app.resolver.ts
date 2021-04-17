import { IsString } from "class-validator";
import {
  Resolver,
  Query,
  Field,
  ObjectType,
  Parent,
  InputType,
  Args,
  ResolveField,
} from "@nestjs/graphql";

@ObjectType()
export class App {
  @IsString()
  @Field()
  name!: string;
}

@InputType("input")
export class HelloInput {
  @IsString()
  @Field({ nullable: true })
  age?: string;
}

@Resolver(() => App)
export class AppResolver {
  @Query(() => App)
  async app(_, __, ___) {
    // console.log(`context`, context);
    return { name: "hello" };
  }

  @ResolveField(() => String)
  async hello(
    @Parent() root: App,
    @Args("input") input: HelloInput,
    _,
  ): Promise<string> {
    console.log(`root`, root);
    const { name } = root;
    const { age } = input;
    console.log(`name`, name);
    console.log(`age`, age);
    console.log("root :>> ", root);
    // console.log(`context`, context);
    return `Hello my name is ${name}, ${age}-years-old`;
  }
}
