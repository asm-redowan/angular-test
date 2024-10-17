import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  
  const myToken = localStorage.getItem('token');
  const email = localStorage.getItem("email");
    const encodedData = btoa(email ?? "");
  const cloneRequest = req.clone({
    setHeaders:{
      Authorization: `Bearer ${myToken}`,
      tailer: encodedData
    }
  })
  return next(cloneRequest);
};
