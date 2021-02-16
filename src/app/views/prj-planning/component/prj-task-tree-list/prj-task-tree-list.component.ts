import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { Required } from '../../decorators/required.decorator';
import { defaultOptions } from '../default.options';
import { Node, TreeTableNode, Options, SearchableNode } from '../../model/models';
import { flatMap, defaults } from 'lodash';
import { TreeService } from '../../services/tree/tree.service';
import { ValidatorService } from '../../services/validator/validator.service';
import { ConverterService } from '../../services/converter/converter.service';
@Component({
  selector: 'app-prj-task-tree-list',
  templateUrl: './prj-task-tree-list.component.html',
  styleUrls: ['./prj-task-tree-list.component.scss']
})
export class PrjTaskTreeListComponent<T> implements OnInit,OnChanges {

  @Input() tree: Node<any> | Node<any>[]; 
  @Input() options: Options<T> = {};
  @Output() nodeClicked: Subject<TreeTableNode<T>> = new Subject();
  @Output() itemClicked = new EventEmitter<any>(null);
  private searchableTree: SearchableNode<T>[];
  private treeTable: TreeTableNode<T>[];
  @Input() displayedColumns: string[];
  dataColums: string[];
  dataSource: MatTableDataSource<TreeTableNode<T>>;
  constructor(
    private treeService: TreeService,
     private validatorService: ValidatorService,
     private converterService: ConverterService,
    elem: ElementRef
  ) {
    const tagName = elem.nativeElement.tagName.toLowerCase();
    if (tagName === 'ng-treetable') {
      console.warn(`DEPRECATION WARNING: \n The 'ng-treetable' selector is being deprecated. Please use the new 'treetable' selector`);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.tree.isFirstChange()) {
      return;
    }
    console.log("changed")
    this.tree = Array.isArray(this.tree) ? this.tree : [this.tree];
    this.searchableTree = this.tree.map(t => this.converterService.toSearchableTree(t));
    const treeTableTree = this.searchableTree.map(st => this.converterService.toTreeTableTree(st));
    this.treeTable = flatMap(treeTableTree, this.treeService.flatten);
    this.dataSource = this.generateDataSource();
  }
  ngOnInit() {
    this.tree = Array.isArray(this.tree) ? this.tree : [this.tree];
    console.log(this.tree)
    this.options = this.parseOptions(defaultOptions);
    const customOrderValidator = this.validatorService.validateCustomOrder(this.tree[0], this.options.customColumnOrder);
    if (this.options.customColumnOrder && !customOrderValidator.valid) {
      throw new Error(`
        Properties ${customOrderValidator.xor.map(x => `'${x}'`).join(', ')} incorrect or missing in customColumnOrder`
      );
    }
    this.searchableTree = this.tree.map(t => this.converterService.toSearchableTree(t));
    const treeTableTree = this.searchableTree.map(st => this.converterService.toTreeTableTree(st));
    this.treeTable = flatMap(treeTableTree, this.treeService.flatten);
    this.dataSource = this.generateDataSource();
    console.log('ddssdfd'+ this.displayedColumns);
  }

  extractNodeProps(tree: Node<T> & { value: { [k: string]: any } }): string[] {
    return Object.keys(tree.value).filter(x => typeof tree.value[x] !== 'object');
  }

  generateDataSource(): MatTableDataSource<TreeTableNode<T>> {
    return new MatTableDataSource(this.treeTable.filter(x => x.isVisible));
  }

  formatIndentation(node: TreeTableNode<T>, step: number = 5): string {
    return '&nbsp;'.repeat(node.depth * step);
  }

	formatElevation(): string {
		return `mat-elevation-z${this.options.elevation}`;
	}

  onNodeClick(clickedNode: TreeTableNode<T>): void {
    clickedNode.isExpanded = !clickedNode.isExpanded;
    this.treeTable.forEach(el => {
      el.isVisible = this.searchableTree.every(st => {
        return this.treeService.searchById(st, el.id).
          fold([], n => n.pathToRoot)
          .every(p => this.treeTable.find(x => x.id === p.id).isExpanded);
      });
    });
    this.dataSource = this.generateDataSource();
    this.nodeClicked.next(clickedNode);
  }

  // Overrides default options with those specified by the user
  parseOptions(defaultOpts: Options<T>): Options<T> {
    return defaults(this.options, defaultOpts);
  }
  clicked(value){
    console.log("--------")
     console.log(value)
    this.itemClicked.emit(value)
  }
}
