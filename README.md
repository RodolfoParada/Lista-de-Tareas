#### 1. crear carpeta Theory para guardar las tasks.
#### 2. crear carpeta Practice para guardar la tarea antes de ser desarrollada
  #### las dependencias devolvio error por la tanto instale las siguientes dependencias-
     ```
     npm install --save-dev \
     @testing-library/react \
     @testing-library/jest-dom \
     @testing-library/user-event
     ```

    ```
     npm install --save-dev \
     jest \
     jest-environment-jsdom \
     @testing-library/react \
     @testing-library/jest-dom \
     @testing-library/user-event \
     identity-obj-proxy
     ```

     ```
     npm install --save-dev \
     @babel/core \
     @babel/preset-env \
     @babel/preset-react \
     babel-jest
     ```
     ``` 
     npm install --save-dev react-test-renderer
     ```
     ```
     npm install --save-dev jest-environment-jsdom
     ```

     #### para levantar el programa se debe realizar con lo siguiente
      ```
     rm src/tests/__snapshots__/TodoList.snapshot.test.jsx.snap
     npm test
      ```
