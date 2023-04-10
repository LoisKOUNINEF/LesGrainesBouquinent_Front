import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { lastValueFrom, of } from 'rxjs';
import { SharedModulesModule } from 'src/app/shared/modules/shared-modules.module';
import { mockComments } from 'tests/mock-arrays/mock-comments-array';
import { CommentStub } from 'tests/stub-dto/comment.stub';
import { CommentDTO } from '../../dto/comment.dto';
import { Comment } from '../../models/comment.model';
import { ApiCallService } from '../api-call/api-call.service';

import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let service: CommentsService;
  let apiCallServiceMock = MockService(ApiCallService);

  const commentDto = new CommentStub;
  const comments = mockComments;
  const commentsUrl = '/comments';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModulesModule,
      ],
      providers: [
        {
          provide: ApiCallService,
          useValue: apiCallServiceMock,
        }
      ],
    });
    service = TestBed.inject(CommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('apiCallServiceMock', () => {
    it('should be defined', () => {
      expect(apiCallServiceMock).toBeDefined();
    });
  });

  describe('create method', () => {
    it('should have a create method', () => {
      expect(service.create).toBeDefined();
      expect(service.create).toBeInstanceOf(Function);
    });
    it('should call ApiCallService post method', async () => {
      apiCallServiceMock.post = (jest.fn(() => of(commentDto as CommentDTO))) as any;
      const bookId = 'randomString1';
      const comment = await lastValueFrom(service.create(commentDto, bookId));
      expect(apiCallServiceMock.post).toHaveBeenCalled()
      expect(apiCallServiceMock.post).toHaveBeenCalledWith(commentsUrl, {bookId, commentDto});
      expect(comment.content).toBe(commentDto.content)
    });
  });

  describe('findAll method', () => {
    it('should have a findAll method', () => {
      expect(service.findAll).toBeDefined();
      expect(service.findAll).toBeInstanceOf(Function);
    });
    it('should call ApiCallService get method', async () => {
      apiCallServiceMock.get = (jest.fn(() => of(comments as Comment[]))) as any;
      const commentsList = await lastValueFrom(service.findAll());
      expect(apiCallServiceMock.get).toHaveBeenCalled();
      expect(apiCallServiceMock.get).toHaveBeenCalledWith(commentsUrl);
      expect(commentsList.length).toBe(4);
      expect(commentsList[0].content).toBe('comment test 1');
    });
  });

  describe('findOneById method', () => {
    it('should have a findOneById method', () => {
      expect(service.findOneById).toBeDefined();
      expect(service.findOneById).toBeInstanceOf(Function);
    });
    it('should call ApiCallService get method', async () => {
      apiCallServiceMock.get = (jest.fn(() => of(comments[0] as Comment))) as any;
      const comment = await lastValueFrom(service.findOneById(comments[0].id));
      expect(apiCallServiceMock.get).toHaveBeenCalled();
      expect(apiCallServiceMock.get).toHaveBeenCalledWith(`${commentsUrl}/${comments[0].id}`);
      expect(comment.content).toBe(comments[0].content)
    });
  });

  describe('update method', () => {
    it('should have an update method', () => {
      expect(service.update).toBeDefined();
      expect(service.update).toBeInstanceOf(Function);
    });
    it('should call ApiCallService patch method', async () => {
      apiCallServiceMock.patch = (jest.fn(() => of(commentDto as Comment))) as any;
      const comment = await lastValueFrom(service.update(comments[1].id, commentDto));
      expect(apiCallServiceMock.patch).toHaveBeenCalled();
      expect(apiCallServiceMock.patch).toHaveBeenCalledWith(`${commentsUrl}/${comments[1].id}`, commentDto);
      expect(comment.content).toBe(commentDto.content)
    });
  });

  describe('delete method', () => {
    it('should have a delete method', () => {
      expect(service.delete).toBeDefined();
      expect(service.delete).toBeInstanceOf(Function);
    });
    it('should call ApiCallService delete method', async () => {
      apiCallServiceMock.delete = (jest.fn(() => of('deleted' as any))) as any;
      const comment = await lastValueFrom(service.delete(comments[0].id));
      expect(apiCallServiceMock.delete).toHaveBeenCalled();
      expect(apiCallServiceMock.delete).toHaveBeenCalledWith(`${commentsUrl}/${comments[0].id}`);
      expect(comment).toBe('deleted');
    });
  });
});
