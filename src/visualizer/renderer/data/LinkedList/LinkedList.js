
// Use a linked list to store data - average array to get peaks and troughs
// better performance

class ListNode {
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
       
                     
    }
}


export class LinkedList {
    constructor(head = null, tail = null) {
        this.head = head
        this.tail = tail;
        this.size = 0;
       
    }


  	insertFirst(data){
  		// let end = null
  		
  		let node = new ListNode(data, this.head, null)
  		if(this.head ===  null){
  			this.head = node
  			this.tail = node
  		}else{
  			this.head = node
  			node.next.prev = node
  		}

  		// if(this.size > 1){
  		// 	this.head.next.end = null
  		// }
  		this.size++;
  	}

	removeLast(){
		this.tail = this.tail.prev
		this.tail.next = null
		this.size--
	}


	clear() {
	    this.head = null;
	}


	getLast() {
	    let lastNode = this.head;
	    if (lastNode) {
	        while (lastNode.next) {
	            lastNode = lastNode.next
	        }
	    }
	    return lastNode
	}

	getFirst() {
	    return this.head;
	}
}
