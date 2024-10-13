import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'generalPipe'
})
export class GeneralPipePipe implements PipeTransform {
	transform(fn: any, ...args: any[]): any {
		return fn(...args);
	}
}