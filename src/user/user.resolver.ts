import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class UserResolver {
  @Query(() => String)
  async bye() {
    return "bye";
  }
}
