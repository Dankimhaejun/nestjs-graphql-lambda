import { Module } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: () => {
        const schemaModuleOptions: Partial<GqlModuleOptions> = {};

        // If we are in development, we want to generate the schema.graphql
        if (process.env.NODE_ENV !== 'production' || process.env.IS_OFFLINE) {
          schemaModuleOptions.autoSchemaFile = 'src/schema.gql';
        } else {
          schemaModuleOptions.typePaths = ['dist/*.gql'];
          // For production, the file should be generated
        }
        console.log(`schemaModuleOptions`, schemaModuleOptions)
        return {
          context: ({ req }) => ({ req }),
          playground: true, // Allow playground in production
          introspection: true, // Allow introspection in production
          ...schemaModuleOptions,
        };
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppResolver, UserResolver],
})
export class AppModule {}
