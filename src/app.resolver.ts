import {
  Resolver,
  Query,
  Field,
  ObjectType,
  ResolveProperty,
} from "@nestjs/graphql";

@ObjectType()
export class HelloOutput {
  @Field()
  name: string;
}
@Resolver(() => HelloOutput)
export class AppResolver {
  @Query(() => HelloOutput)
  async hello(_, __, context) {
    // console.log(`context`, context);
    return { name: "hello" };
  }

  @ResolveProperty(() => String)
  async bye(HelloOutput, __, context) {
    const { name } = HelloOutput;
    console.log(`name`, name);
    console.log(`HelloOutput`, HelloOutput);
    // console.log(`context`, context);
    return name;
  }
}
