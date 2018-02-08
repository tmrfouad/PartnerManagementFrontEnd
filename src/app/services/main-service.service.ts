import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export class MainService { 

  url : string ;
  constructor(private http : Http) {  
  } 
  get() { 
    return this.http.get(this.url) ;
  }

  Post(item) { 
    return this.http.post(this.url,item) ;
  }

  Put(item) { 
    return this.http.put(this.url + '/' + item.id , item) ;
  }

  Delete(id) { 
    return this.http.delete(this.url+'/' + id) ;
  }

}
