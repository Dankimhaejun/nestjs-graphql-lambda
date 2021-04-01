import { Module } from "@nestjs/common";
import { GqlModuleOptions, GraphQLModule } from "@nestjs/graphql";
import { AppController } from "./app.controller";
import { AppResolver } from "./app.resolver";
import { UserResolver } from "./user/user.resolver";
import { UserModule } from "./user/user.module";

@Module({
  controllers: [AppController],
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: () => {
        const schemaModuleOptions: Partial<GqlModuleOptions> = {};

        // If we are in development, we want to generate the schema.graphql
        if (process.env.NODE_ENV !== "production" || process.env.IS_OFFLINE) {
          schemaModuleOptions.autoSchemaFile = "src/schema.gql";
        } else {
          // For production, the file should be generated
          schemaModuleOptions.typePaths = ["dist/*.gql"];
        }

        return {
          context: ({ req }) => ({ req }),
          introspection: true, // Allow introspection in production
          playground: true, // Allow playground in production
          ...schemaModuleOptions,
        };
      },
    }),
    UserModule,
  ],
  providers: [AppResolver, UserResolver],
})
export class AppModule {}
