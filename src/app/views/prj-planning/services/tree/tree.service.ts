import { Injectable } from '@angular/core';
import { Node, SearchableNode, NodeInTree } from '../../model/models';
import { cloneDeep } from 'lodash-es';
import { Option, some, none } from 'fp-ts/lib/Option';
import {Task} from "../../model/task";

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  /**
   * Traverse a tree data structure and applies the provided @param f function
   * to all nodes
   * @param root the tree to be traversed
   * @param f the function to be applied to all nodes
   * N.B. this function modifies the existing tree
   */
  traverse<T, K extends Node<T>>(root: K, f: (node: K) => void): void {
    this._traverse(root, (node: K) => {
      f(node);
      return true;
    });
  }

  /**
   * Search a tree for a node with the provided @param id
   * @param root the tree to be searched
   * @param id the id of the node to be retrieved
   */
  searchById<T, K extends SearchableNode<T>>(root: K, id: string): Option<NodeInTree<T>> {
    let matchingNode: K;
    const pathToRoot: {[k: string]: K} = {};
    this._traverse(root, (node: K) => {
      node.children.forEach(child => {
        pathToRoot[child.id] = node;
      });
      if (node.id === id) {
        matchingNode = node;
      }
      return node.id !== id;
    });
    return matchingNode ? some({
      id: matchingNode.id,
      value: matchingNode.value,
      children: matchingNode.children,
      pathToRoot: this.buildPath(id, pathToRoot)
    }) : none;
  }

  /**
   * Internal function that can be used to traverse or search the tree
   * @param root the tree to be scanned
   * @param f an optional function to be applied to all nodes
   */
  private _traverse<T, K extends Node<T>>(root: K, f: (node: K) => boolean): void {
    if (!f(root)) {
      return;
    }
    root.children.forEach(c => this._traverse(c, f));
  }

  /**
   * Given a @param root tree and a @param node node, calculate the
   * depth of the node in the tree
   * @param root the tree
   * @param node the node we want to calculate the depth of
   */
  getNodeDepth<T, K extends SearchableNode<T>>(root: K, node: K): number {
    return this.searchById(root, node.id).fold(-1, n => n.pathToRoot.length);
  }

  /**
   * Flatten a @param root tree into a list of its nodes
   * @param root the tree to be flattened
   */
  flatten<T, K extends Node<T>>(root: K): K[] {
    const result = [cloneDeep(root)];
    for (let i = 0; i < result.length; i++) {
      const node = result[i];
      if (node.children) {
        result.splice(result.indexOf(node) + 1, 0, ...node.children as K[]);
      }
    }
    return result;
  }

  /**
   * Internal function used to build the pathToRoot of a node in a tree
   * @param id the id of the node
   * @param pathMap the pathMap returned by searchById
   */
  private buildPath<T, K extends SearchableNode<T>>(id: string, pathMap: {[k: string]: K}): K[] {
    const pathToRoot = [];
    let key = id;
    while (key) {
      if (pathMap[key]) {
        pathToRoot.push(pathMap[key]);
        key = pathMap[key].id;
      } else {
        key = null;
      }
    }
    return pathToRoot;
  }

  /**
   * get Nod<Task>[]
   * @param collection
   * @returns Nod<Task>[]
   */
  public taskTree(collection: Task[]): Node<Task>[] {
    let data = [];
    if (collection !== null && collection !== undefined) {
      collection.forEach((task) => {
        console.log(task)
        let subs = this.taskTree(task.subTasks);
        let taskNode = this.taskToTaskNodConvert(task);
        if (subs !== undefined) taskNode.children = [...subs];
        data.push(taskNode);
      })
    }
    return data;
  }
  private taskToTaskNodConvert(task: Task) {
    return {
      value: task,
      children: []
    };
  }

  public getTreeTaskToChildTasksId(collection: Task): string[]{
    let data = [];
    if (collection !== null && collection !== undefined) {
      collection.subTasks.forEach((task) => {
        data.push(...this.getTreeTaskToChildTasksId(task))
      })
       data.push(collection.id)

    }
    return data;
  }


}
