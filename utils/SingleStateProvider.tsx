import React from 'react';
import * as Rx from "rxjs";
import { Subject } from 'rxjs';

interface items{
    [key: string]: any
}

export default class SingleStateProvider implements items
{
    private static instance: SingleStateProvider;
    
    private items: items = {};

    public userSubject = new Subject();
    public loadingSubject = new Subject();

    public static getInstance(): SingleStateProvider 
    {
        if (!SingleStateProvider.instance) {
            SingleStateProvider.instance = new SingleStateProvider();
        }

        return SingleStateProvider.instance;
    }

    public storeKeyValue(key: string, value: any) 
    {
        if(!this.items.hasOwnProperty(key))
        {
            this.items[key] = value;
            return;
        }

        this.items[key] = value;
        
        switch(key)
        {
            case 'isLoading':
                this.loadingSubject.next(value);
                break;
            case 'user':
                this.userSubject.next(value);
                break;
            default: 
                break;
        }
    }
    
    public getValueForKey(key: any) {
        return this.items[key];
    }
}